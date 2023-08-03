import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { RiQuillPenFill } from "react-icons/ri";

import "./profile.css";
import NabBar from "../layOut/Navbar";
import Post from "../Post/Post";
import PrifileUpdate from "./profileUpodate/PrifileUpdate";
import OwnPost from "../Post/ownPost/OwnPost";

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [modelsOpen, setModelsOpen] = useState(true)
  const token = localStorage.getItem("token");


  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };


  const handleClosePermission = (PermissionData)=>{
    {
      PermissionData && setShowModal(false);
    }
    
  }




  const getUserProfile = async () => {
    if (!token) {
      console.log("Token not present or expired");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/users/profile", {
        headers: {
          Authorization: token,
        },
      });
      const userData = response.data;
      console.log(userData);
      setUserProfile(userData);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const profileImageUrl = userProfile?.image
    ? `data:image/png;base64,${Buffer.from(userProfile.image.data).toString(
        "base64"
      )}`
    : "https://images.pexels.com/photos/675267/pexels-photo-675267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <>
      <NabBar />
      <main className="profile-ui">
        {userProfile && (
          <>
            <header
              className="profile-header"
              style={{ backgroundImage: `url(${profileImageUrl})` }}
            ></header>
            <div className="profileData">
              <div className="profile-image">
                <img src={profileImageUrl} alt={userProfile.name} />
                <RiQuillPenFill className="updateIcon" onClick={() => { handleShow(); setModelsOpen(false); }}/>
              </div>
              <div className="proData">
                <h1>{userProfile.userName}</h1>
              </div>
            </div>
          </>
        )}
  
      </main>
      {
        userProfile &&
     
      <section className="Post-section">
      <Button className='create-post' onClick={() => { handleShow(); setModelsOpen(true); }}>
        Ctrate Post
      </Button>
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="postTitle">
            {
              modelsOpen?
              "Create Post":
              "Update Post"
            }
            
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {modelsOpen &&
            modelsOpen?
            <Post onClosePermission={handleClosePermission} />:
            <PrifileUpdate userProfileData={userProfile}/>
          }
         
        </Modal.Body>



        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button >
          {/* <Button variant="primary">
            Save changes
          </Button> */}
        </Modal.Footer>
      </Modal>

      </section>
       }

       <section>
        <OwnPost />
       </section>
    </>
  );
};
export default Profile;
