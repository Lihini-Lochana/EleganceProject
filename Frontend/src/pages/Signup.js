import React, { useState } from "react";
import Navbar from "../compornents/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./signup.css";  

const SignupRegister = () => {
  const [formData, setFormData] = useState({ username: "", email: "", contact_Number: "", password: "", confirmPassword: "" });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const sendOtp = () => {
    if((formData.password!==formData.confirmPassword)){return alert("diffrent passwords")};
    if (((!formData.email)||(!formData.username)||(!formData.contact_Number)||(!formData.password)||(!formData.confirmPassword))||(formData.password!==formData.confirmPassword))return alert("Fill All of form");

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setShowOtpBox(true);

    emailjs.send("service_md3lddk", "template_62100r6", { to_email: formData.email, message: newOtp }, "DyyRIVDaiq2DvZbpm")
      .then(() => alert(`OTP sent to ${formData.email}! Check your email.`))
      .catch(() => alert("Failed to send OTP"));
  };

 
 /* const verifyOtpAndSave = async () => {
    if (otp !== generatedOtp) return setMessage("Invalid OTP!");

    try {
      await axios.post("http://localhost:8080/api/signup/save", formData);
      
      setMessage("OTP Verified! Now You can Logging.");
    } catch (err) {
      alert("Signup Failed!");
    }
  };
  */

  const verifyOtpAndSave = async () => {
    if (otp !== generatedOtp) return setMessage("Invalid OTP!");
  
    try {
      const response = await axios.post("http://localhost:8080/api/signup/save", formData);
      
      if (response.status === 200) {
        setMessage(
          <>OTP Verified! Now You can <Link to="/Login">Login</Link>.
          </>);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage(
          <>You are already signed up. Please <Link to="Login">log in.</Link></>);
      } else {
        alert("Signup Failed!");
      }
    }
  };
  

  function cutotp(){
    setShowOtpBox(false);
  }

  return (
    <div style={{ maxHeight: "100vh" }}>
      <Navbar />
      <div className="container-signup" style={{ opacity: showOtpBox ? '0.1' : '1' }}>
        <div className="row align">
          <div className="col">
            <div className="signup-form">
            <p style={{textAlign:"center",fontSize:"30px",fontWeight:"bold"}}>Sign up</p>
              <form>
                <div className="input-group-signup">
                  <input type="text" name="username" placeholder="Name" onChange={handleChange} required  />
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <input type="number" name="contact_Number" placeholder="Contact Number" onChange={handleChange} required />
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                </div>
                <br />
                <br />
                
                {!otpSent ? (
                  <button className="submit-btn" type="button" onClick={sendOtp}>Sign Up</button>
                ) : (
                  <p className="info-text">OTP Sent! Please check your email.</p>
                )}
                <br />
                <br />
                <p className="login-link" style={{marginLeft:"10px"}}>Already signed up? <Link to="/Login" style={{color:"red"}}>Login</Link></p>
              </form>
            </div>
          </div>
          <div className="col">
            <div className="rightpicture"></div>
          </div>
        </div>
      </div>

      
      {showOtpBox && (
        <div className="otp">
          <div className="otp-content">
          <i class="bi bi-x-circle-fill" onClick={cutotp} style={{marginTop:"-50px",marginLeft:"95%",fontSize:"35px",cursor:"pointer"}}></i>
          <div className={otp === generatedOtp ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</div>
            <h4>Pleace Cheack Your Email And enter Your OTP </h4>
            <br />
            <input type="number" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <br />
            <button onClick={verifyOtpAndSave}>Enter</button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupRegister;
