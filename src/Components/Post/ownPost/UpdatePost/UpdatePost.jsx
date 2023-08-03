import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsThreeDotsVertical } from "react-icons/bs";
import JoditEditor from "jodit-react";
import axios from "axios";
import "./UpdatePost.css";
import DeletePost from "../../deletePost/DeletePost";

const UpdatePost = (props) => {
  const [postUpdateData, setPostUpdateData] = useState(props.onPostData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editor = useRef(null);

  // Function to handle form input changes
  const handleChange = (e) => {
    // Check if JoditEditor is triggering the change
    if (e.target && e.target.name) {
      const { name, value, files } = e.target;
      setPostUpdateData((prevState) => ({
        ...prevState,
        [name]: name === "image" ? files[0] : value,
      }));
    } else {
      // JoditEditor change
      setPostUpdateData((prevState) => ({
        ...prevState,
        descriptions: e,
      }));
    }
  };

  const token = localStorage.getItem("token");

  // Function to handle form submission for updating the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the form data for updating the post
      const formData = new FormData();
      formData.append("bookName", postUpdateData.bookName);
      formData.append("descriptions", postUpdateData.descriptions);
      formData.append("image", postUpdateData.image);

      // Make a PATCH request to update the post data
      const res = await axios.patch(
        `http://localhost:5000/post/${postUpdateData._id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        // On successful update, close the modal and set the updateSuccess state to true
        handleClose();
        props.setUpdateSuccess(true);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle the error, show an error message, etc.
    }
  };

  return (
    <>
      <BsThreeDotsVertical
        className="postUpdateIcon"
        variant="primary"
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group updatePost">
              <input
                type="text"
                id="bookName"
                name="bookName"
                className="form-control"
                value={postUpdateData.bookName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group updatePost">
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <JoditEditor
                className="JoditEditor"
                ref={editor}
                value={postUpdateData.descriptions}
                tabIndex={1}
                name="descriptions"
                onChange={handleChange}
              />
            </div>
            <button className="updateSubmitButton" onClick={handleSubmit}>
            Save Changes
          </button>
          </form>
          <DeletePost idforDelete={postUpdateData._id}/>
        </Modal.Body>
        <Modal.Footer>
           {/* <DeletePost idforDelete={postUpdateData._id}/> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePost;
