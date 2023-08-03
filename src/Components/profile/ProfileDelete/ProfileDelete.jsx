import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const ProfileDelete = (props) => {
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/${props.userId}`
      );

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
      >
        Do you want to delete your profile?
      </p>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <form onSubmit={handleDeleteUser}>
            <button className="submit-form" type="submit">
              Delete User
            </button>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default ProfileDelete;
