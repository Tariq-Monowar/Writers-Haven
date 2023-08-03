import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";

const NabBar = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [profile, setProfile] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);

  const getUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/profile", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        setUserProfile(response.data);
        setProfile(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const profileImageUrl = userProfile?.image
    ? `data:image/png;base64,${Buffer.from(userProfile.image.data).toString(
        "base64"
      )}`
    : "https://cdn-icons-png.flaticon.com/512/219/219983.png";

  return (
    <Navbar collapseOnSelect className="navBarStyle" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navLogo">
          {"Writer's Haven"}
        </Navbar.Brand>
        <Navbar.Toggle
          className="nabvarBar"
          aria-controls="responsive-navbar-nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="white"
          >
            <path
              d="M4 6h22M4 15h22M4 24h22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navElements">
            <Link to="/" className="nav-link" activeClassName="active">
              Home
            </Link>
            <Link to="/login" className="nav-link" activeClassName="active">
              Log In
            </Link>

            <Link to="/register" className="nav-link" activeClassName="active">
              Sign In
            </Link>

            {profile && (
              <Link
                to="/login"
                className="nav-link"
                activeClassName="active"
                onClick={handleLogout}
              >
                log out
              </Link>
            )}
            {profile && (
              <Link to="/Profile" className="nav-link" activeClassName="active">
                <img src={profileImageUrl} className="userImage" />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NabBar;
