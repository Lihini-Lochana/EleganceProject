import React, { useState } from "react";
//import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import "./login.css"; 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap";
//import Navbar from "./Navbar.js"
import Navbar from "../compornents/Navbar";
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';



const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpin,setotpin]=useState(false);
  const [changepassword,setchangepassword]=useState(false);
  const navigate = useNavigate();

  const [otpEmail, setOtpEmail] = useState("");
const [otpInput, setOtpInput] = useState("");
const [generatedOtp, setGeneratedOtp] = useState("");

const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    
    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:8080/api/login/authenticatesave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); 
        navigate("/Selectplaces"); 
        localStorage.setItem("userEmail", email);
      } else {
        setError(alert("Invalid email or password. Please try again."));
      }
    } catch (error) {
      setError("wait");
      /*navigate("/Selectplaces"); */
      navigate("/Dashboad");
      localStorage.setItem("userEmail", email);
    }
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    setShowOTPModal(true); // Show the OTP popup
  };


  const sendOtp = () => {
    if (!otpEmail) return alert("Please enter your email");
  
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setotpin(true);
  
    emailjs
      .send(
        "service_md3lddk",
        "template_62100r6",
        { to_email: otpEmail, message: newOtp },
        "DyyRIVDaiq2DvZbpm"
      )
      .then(() => alert(`OTP sent to ${otpEmail}! Check your email.`))
      .catch(() => alert("Failed to send OTP"));
  };
  
  const verifyOtp = () => {
    if (otpInput === generatedOtp) {
      alert("OTP verified!");
      //setShowOTPModal(false);
      setchangepassword(true);
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };



  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8080/api/signup/update-password?email=${otpEmail}&newPassword=${newPassword}`,
        {
          method: "PUT",
        }
      );
  
      if (response.ok) {
        alert("Password changed successfully!");
        setShowOTPModal(false);
        setchangepassword(false);
        setotpin(false);
      } else {
        const errorText = await response.text();
        alert("Failed to change password: " + errorText);
      }
    } catch (error) {
      alert("An error occurred while changing the password.");
      console.error(error);
    }
  };
  
  
  

  return (
    <div>

<Navbar />
    <div style={{maxHeight:"100vh"}}>
      
    


<div class="container-login">
  <div class="row">
   
    <div class="col-sm">
      <div className="login-form">
        <p style={{textAlign:"center",fontSize:"30px",fontWeight:"bold"}}>Login</p>
        <br />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleLogin}>
        <div className="input-group">
            <input type="email" placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required />
            {isRegister && <input type="email" placeholder="Email" />}
            <input type="password" placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
           
            
          </div>
          <p className="log-forgetpassword"  onClick={handleForgetPassword}><Link class="link-offset-1" href="#" style={{marginLeft: "5px"}}>foget your password</Link></p>
          <button className="submit-btn">Login</button>
          <br />
          <br />
          <p className="log-gotosignup">if your are not sign up pleace <Link to="/Signup" class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Sing Up</Link></p>
          <p className="log-gotosignup">if your are <Link to="/Admintourlist" class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">admin</Link></p>
        </form>
      </div>
    </div>
    
    <div className="col-sm">
    <div className="rightpicture">
        

        </div>
    </div>
  </div>
</div>
    </div>

    {showOTPModal && (
  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content p-4">
        <div className="modal-header">
          <h5 className="modal-title">OTP Verification</h5>
          <button type="button" className="btn-close" onClick={() => setShowOTPModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>Enter Your Email</p>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={otpEmail}
            onChange={(e) => setOtpEmail(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" onClick={sendOtp}>Send OTP</button>
          <br /><br />

          {otpin && (
            <>
              <p>Enter the OTP sent to your email</p>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
            </>
          )}
        {changepassword && (
          <div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        <button className="btn btn-primary" onClick={handlePasswordChange}>Confirm</button>
         </div>
        )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowOTPModal(false)}>Close</button>
          {otpin && <button className="btn btn-primary" onClick={verifyOtp}>Verify</button>}
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default LoginRegister;