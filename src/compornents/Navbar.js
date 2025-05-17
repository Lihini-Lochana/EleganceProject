import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Link } from "react-router-dom";
import "./navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import image12 from "../images/newlogo.jpeg";
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  return (
    <div className="navbar-full">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundImage: "linear-gradient(to right, white , #002387)" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={image12} style={{ width: "70px", height: "50px", borderRadius: "50%" }} alt="Logo" />
          </a>

          {/* Toggle Button */}
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar Content */}
          <div className={`navbar-collapse ${menuOpen ? "show-menu" : ""}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link smooth to="/Homepage#carouselExample" className="nav-link" style={{ color: "black"}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link smooth to="/Homepage#about" className="nav-link" style={{ color: "black" }}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link smooth to="/Homepage#contact" className="nav-link" style={{ color: "black" }}>
                  Contact Us 
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Signup" className="nav-link" style={{ color: "black" , backgroundColor:"white", borderRadius:"20px"}}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
