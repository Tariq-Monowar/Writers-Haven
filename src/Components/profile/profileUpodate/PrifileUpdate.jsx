import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lodding from '../../loding/Loding';
import './PrifileUpdate'
import ProfileDelete from '../ProfileDelete/ProfileDelete';

const PrifileUpdate = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    userName: '',
    email: '',
    password: '',
    image: null,
    ...props.userProfileData, // Populate initial values from props if available
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('userName', updateData.userName);
    formData.append('email', updateData.email);
    formData.append('image', updateData.image);
    formData.append('password', updateData.password);
    formData.append('conformPassword', updateData.password); // Fix the spelling of 'conformPassword'

    try {
      const res = await axios.patch(`http://localhost:5000/users/${props.userProfileData._id}`, formData);
      if (res.status === 200) { // Changed the status code to 200 since it's a successful update, not 201.
        window.location.reload();
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false); // Use the error message from the backend response
    }
  };

  return (
    <>
      <div className="signin-container">
        <div className="sign-loddingSet">
          {loading && (
            <div className="lodding-align">
              <Lodding />
            </div>
          )}
          {error && (
            <p className="sign-error-message">{error}</p> // Display the error message received from the backend
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="user-form">
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              className="form-control"
              value={updateData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="user-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={updateData.email}
              onChange={handleChange}
            />
          </div>
          <div className="user-form">
            <input
              type="file"
              name="image"
              className="form-control-image"
              onChange={handleChange}
            />
          </div>
          <div className="user-form">
            <input
              type="password"
              name="password"
              minLength="6"
              placeholder="Password"
              className="form-control"
              // value={updateData.password}
              onChange={handleChange}
            />
          </div>
          <div className="sig-form-group form-control-password">
            <button type="submit" className="submit-form">
              Update
            </button>
          </div>
        </form>

      </div>
      <div className='DeleteUser'>
            <ProfileDelete userId={updateData._id}/>
      </div>
    </>
  );
};

export default PrifileUpdate;
