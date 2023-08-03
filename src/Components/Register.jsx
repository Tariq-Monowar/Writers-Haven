import { useState, useEffect } from "react";
import axios from "axios";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./style/Register.css";
import NavBar from "./layOut/Navbar";
import Loding from "./loding/Loding";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    image: null,
    password: "",
    conformPassword: "", // Changed the field name to 'conformPassword'
  });

  const [lodings, setLodings] = useState(false);
  const [error, setError] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const { userName, email, image, password, conformPassword } = formData; // Changed the field name to 'conformPassword'

  useEffect(() => {
    if (
      userName !== "" &&
      email !== "" &&
      password !== "" &&
      conformPassword !== ""
    ) {
      setShowSubmitButton(true);
    } else {
      setShowSubmitButton(false);
    }
  }, [userName, email, password, conformPassword]); // Changed the field name to 'conformPassword'

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLodings(true);
    setError(false);
    console.log(formData);

    try {
      const userData = new FormData();
      userData.append("userName", formData.userName);
      userData.append("email", formData.email);
      userData.append("password", formData.password);
      userData.append("conformPassword", formData.conformPassword); // Changed the field name to 'conformPassword'
      userData.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:5000/users",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.status === 201) {
        navigate("/profile");
        console.log(response);
      }

      if (response && response.data) {
        // Check if the response and its 'data' property are defined
        console.log(response.data.token);
        const token = response.data.token;
        localStorage.setItem("token", token);
        // Handle the response data as needed
      } else {
        console.log("No response data received.");
      }
    } catch (error) {
      console.log("Error:", error.response.data);
      setError(error.response.data.message);
    }

    setLodings(false);
  };

  return (
    <>
      <NavBar />
      <div className="registerForm">
        <h1 className="form-titles">Create your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="user-form">
            <input
              type="text"
              className="input-field"
              name="userName"
              placeholder="User Name"
              value={userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="user-form">
            <input
              type="email"
              className="input-field"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="user-form">
            <input
              type="file"
              className="image-form"
              placeholder="Profile Image"
              name="image"
              onChange={handleChange}
            />
          </div>

          <div className="user-form">
            <input
              type={passwordShow ? "password" : "text"}
              className="input-field password-field"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
            <span
              className="hide_show_icon"
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className="user-form">
            <input
              type={confirmPasswordShow ? "password" : "text"}
              className="input-field confirm-password-field"
              name="conformPassword" // Changed the field name to 'conformPassword'
              placeholder="Confirm Password"
              value={conformPassword} // Changed the field name to 'conformPassword'
              onChange={handleChange}
              required
            />
            <span
              className="hide_show_icon"
              onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
            >
              {confirmPasswordShow ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {lodings && (
            <div style={{ height: "29px" }}>
              <Loding />
            </div>
          )}
          {error && <p style={{ margin: "5px 5px" }}>{error}</p>}
          {showSubmitButton && (
            <input type="submit" className="submit-form" value="Submit" />
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
