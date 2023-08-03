import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import NavBar from "./layOut/Navbar";
import "./style/LoginUser.css";
import Loding from "./loding/Loding";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordShow, setPasswordShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const { email, password } = formData;

  useEffect(() => {
    if (email !== "" && password !== "") {
      setShowSubmitButton(true);
    } else {
      setShowSubmitButton(false);
    }
  }, [email, password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = () => {
    setLoading(true);
    setError("");

    axios
      .post("http://localhost:5000/users/login", formData)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log(res.data.token);
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response.data.message || "An error occurred");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    loginUser();
  };

  return (
    <>
      <NavBar />
      <div className="loginForm">
        <h2 className="form-titles">login</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-form">
            <input
              type="email"
              name="email"
              value={email}
              className="input-field"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="user-form">
            <input
              type={passwordShow ? "password" : "text"}
              name="password"
              value={password}
              className="input-field"
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <span
              className="hide_show_icon"
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? <BiShow /> : <BiHide />}
            </span>
          </div>

          {loading && (
            <div>
              <Loding />
            </div>
          )}

          {error && <p style={{ margin: "0px 5px" }}>{error}</p>}
          
          {showSubmitButton && (
            <button className="submit-form" type="submit">
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
