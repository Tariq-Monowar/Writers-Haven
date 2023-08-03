import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const DeletePost = (props) => {
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/post/${props.idforDelete}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        console.log("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <p
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="deleteFaq"
        style={{margin: "20px 0px 0px 0px", cursor: "context-menu"}}
      >
        Do you want to delete your Post?
      </p>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <form onSubmit={handleDeletePost}>
            <button className="submit-form" type="submit">
              Delete User
            </button>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default DeletePost;
