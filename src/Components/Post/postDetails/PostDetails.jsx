import { useLocation } from "react-router-dom";
import NabBar from "../../layOut/Navbar";
import './PostDetails.css'
const PostDetails = () => {
  const location = useLocation();
//   const posts = location.state.post; // Access the post data from location state
    console.log(location.state.post)


  return (
    <>
      <div style={{ textAlign: "center" }}>
        <NabBar />
      </div>
      <div className="detailsData">
        <div className="container">
            <div dangerouslySetInnerHTML={{ __html: location.state.post.descriptions}} /> 
        </div>
      </div>
    </>
  );
};

export default PostDetails;
