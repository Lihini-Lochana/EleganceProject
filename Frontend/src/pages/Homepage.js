import React, { useState } from "react";
//import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import "./homepage.css"; 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Button } from "bootstrap";
//import Navbar from "./Navbar.js"
import logo2 from "../images/homepage.png";
import pic2 from "../images/travell2.jpg";
import image12 from "../images/newlogo.jpeg";
import Navbar from "../compornents/Navbar";
import Travellvedio from "../images/travellvedio.mp4";
import Travellvedio2 from "../images/travell2vedio.mp4";
import Travellvedio3 from "../images/travell3vedio.mp4";
import "w3-css/w3.css";
import "font-awesome/css/font-awesome.min.css";

const Homepage = () => {
  

  return (
<div>

<Navbar />
<div style={{marginTop:"70px"}}>
 

{/**/ }
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <div className="container-home">
    <video autoPlay loop muted style={{ width: "100%"}}>
        <source src={Travellvedio} type="video/mp4"/>
        
      </video>
    <div className="content-home">
    <div class="container overflow-hidden text-center">
       
       <div class="tour-discription" style={{height:"300px"}}>
       <h1 style={{color:"white",fontWeight:"bold", fontFamily:"Garamond"}}>Welcome</h1>
         <h2 style={{color:"#f39c12",fontFamily:"Garamond"}}>Elegence Tour</h2>
         <p style={{fontFamily:"Sans-serif",fontSize:"20px",fontWeight:"none"}}>Discover Sri Lanka in comfort and style with personalized transport and expert guide services, 
            <br /> plces We provide giude packages and plans for you</p>
      </div>
    
 
      </div>
     <div className="getstart">
        <Link to="/Login" style={{textDecoration:"none",color:"black"}}>GET STRARTED</Link>
      </div>
    </div>
  </div>






    </div>

    <div class="carousel-item">
    <div className="container-home">
    <video autoPlay loop muted style={{ width: "100%" }}>
        <source src={Travellvedio3} type="video/mp4" />
        
      </video>
    <div className="content-home">
     
  
      <div class="container overflow-hidden text-center">
       
            <div class="tour-discription" style={{height:"300px"}}>
            <h1 style={{color:"white",fontWeight:"bold", fontFamily:"Garamond"}}>Welcome</h1>
              <h2 style={{color:"#f39c12",fontFamily:"Garamond"}}>Elegence Tour</h2>
              <p style={{fontFamily:"Sans-serif",fontSize:"20px",fontWeight:"none"}}>Discover Sri Lanka in comfort and style with personalized transport and expert guide services, 
            <br /> plces We provide giude packages and plans for you</p>
           </div>
         
      </div>
     <div className="getstart">
        <Link to="/Login" style={{textDecoration:"none",color:"black"}}>GET STRARTED</Link>
      </div>
    </div>
    </div>
    </div>


    <div class="carousel-item">
      <div className="container-home">
      <video autoPlay loop muted style={{ width: "100%"}}>
        <source src={Travellvedio2} type="video/mp4" />
        
      </video>
    <div className="content-home">
    <div class="container overflow-hidden text-center">
       
       <div class="tour-discription" style={{height:"300px"}}>
       <h1 style={{color:"white",fontWeight:"bold", fontFamily:"Garamond"}}>Welcome</h1>
         <h2 style={{color:"#f39c12",fontFamily:"Garamond"}}>Elegence Tour</h2>
         <p style={{fontFamily:"Sans-serif",fontSize:"20px",fontWeight:"none"}}>Discover Sri Lanka in comfort and style with personalized transport and expert guide services, 
            <br /> plces We provide giude packages and plans for you</p>
      </div>
    
 
      </div>
     <div className="getstart">
        <Link to="/Login" style={{textDecoration:"none",color:"black"}}>GET STRARTED</Link>
      </div>
    </div>
    </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

{/* */}
<a href="https://wa.me/94771234567" class="fa fa-whatsapp" style={{fontSize:"45px",top:"85%",zIndex:"100000",
    left:"4%",
    position:"fixed"}}></a>

{/*<div className="aboutus">

<h1 style={{fontWeight:"bold",color:"#ff6600",fontSize:"50px"}}>About Us</h1>
        <p>
            Welcome to <span class="highlight">Travora</span>, your ultimate travel companion in Sri Lanka! 🇱🇰 Whether you're a tourist looking for an unforgettable adventure 
            or a local searching for a reliable ride, Travora is here to make your journey smooth and hassle-free.
        </p>
        <p>At Travora, we offer two main services:</p>
         <br />
        <b style={{fontSize:"20px",color:"#666"}}> <i>Drop Service</i></b>
        <br />
        <p>
            A smart and convenient way to book rides across Sri Lanka. Just enter your pickup and drop-off locations, select a vehicle, 
            and get an instant fare estimate. Our trusted drivers will ensure a comfortable and safe journey.
        </p>
       <br />
        <b style={{fontSize:"20px", color:"#666"}}> <i>Tour Service</i></b>
        <br />
        <p>
            Discover Sri Lanka like never before! Choose from our pre-planned tour packages or create your own custom itinerary. Whether you want to 
            explore cultural sites, relax on the beaches, or go on an adventure, our expert guides are here to help.
        </p>

        <p>
            Our goal is to <span class="highlight">connect travelers with local communities</span>, providing a unique and immersive experience while 
            supporting small businesses and local guides. With Travora, every trip is more than just a journey — it’s a story waiting to be written! 
        </p>
         <br />
        <b style={{fontSize:"20px", color:"#666"}}><i>Why Choose Travora?</i></b>
        <br />
        <ol type="A">
          <li>Easy Booking & Instant Pricing</li>
          <li> Verified Drivers & Tour Guides</li>
          <li>Custom & Budget-Friendly Packages</li>
          <li>24/7 Customer Support</li>
        </ol>
    
</div>
*/}

<div className="blur-container" id="about">
      <div className="blur-image" />
      <div className="blur-text">
      <div className="aboutus">
      <h1 style={{fontWeight:"bold",color:"#ff6600",fontSize:"50px",fontFamily:"Garamond"}}>About Us</h1>
        <p>
            Welcome to <span class="highlight">Elegance Tour</span>, Elegance Tour is a personalized travel service in Sri Lanka that offers full tour packages and drop services for tourists
        </p>
        <p>At Elegance Tour, we offer two main services:</p>
         <br />
        <b style={{fontSize:"25px",color:"black",fontFamily:"Garamond"}}> Drop Service</b>
        <br />
        <p>
             Reliable and comfortable point-to-point transport for tourists. Whether it’s airport pickups, hotel transfers, or city-to-city travel, we ensure safe, on-time journeys with a personal touch.


        </p>
       <br />
        <b style={{fontSize:"25px", color:"black",fontFamily:"Garamond"}}> Tour Service</b>
        <br />
        <p>
            Discover Sri Lanka like never before! Choose from our pre-planned tour packages or create your own custom itinerary. Whether you want to 
            explore cultural sites, relax on the beaches, or go on an adventure, our expert guides are here to help.
        </p>

        <p>
            Our goal is to <span class="highlight">connect travelers with local communities</span>, To provide personalized, comfortable, and reliable travel experiences in Sri Lanka through expert guide services and flexible transport options, helping every traveler explore the island with ease and joy.
        </p>
         <br />
        <b style={{fontSize:"20px", color:"black"}}><i>Why Choose Eegance Tour?</i></b>
        <br />
        <ol>
          <li>Easy Booking & Instant Pricing</li>
          <li> Verified Drivers & Tour Guides</li>
          <li>Custom & Budget-Friendly Packages</li>
          <li>24/7 Customer Support</li>
        </ol>
        </div>
      </div>
    </div>

<div className="contact" id="contact">
    <div class="row">
      <div class="col-sm">
        <h2>Contact Us</h2>
        <form>
            <input type="text" placeholder="Your Name" required></input>
            <input type="email" placeholder="Your Email" required></input>
            <textarea rows="5" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
        </form>
      </div>
        <div class="col-sm">
        <div style={{ width: "80%", height: "300px", marginTop:"10%"}}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345094076!2d-122.41941558468147!3d37.77492977975951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d158b095b%3A0x1b0b6e9b47d56f5b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1676554471212!5m2!1sen!2sus"
      ></iframe>
    </div>
        </div>
        <div style={{marginTop:"20px"}}></div>
        <div class="container overflow-hidden">
         <div class="row gx-5">
           <div class="col">
            <div class="p-3" style={{textAlign:"left"}}>
            <p> <a href="tel:+94774914987" class="fa fa-phone" style={{fontSize:"45px"}}></a><span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"10px"}}>+94 77 78 094</span></p>
            </div>
           </div>
          <div class="col">
            <div class="p-3" style={{textAlign:"left"}}>
              
             <p> <a href="mailto:info@example.com" class="fa fa-google" style={{fontSize:"45px"}}></a><span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"10px"}}>travora@gmail.com</span></p>
              
            </div>
          </div>
          <div class="col">
          <div class="p-3" style={{textAlign:"left"}}>
             <p> <a href="https://wa.me/0774914987" target="_blank" class="fa fa-whatsapp" style={{fontSize:"45px"}}></a><span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"10px"}}>Chat with us</span></p>
             </div>
          </div>
          </div>
         </div>
      </div>
    </div>

    <div class="container-flud text-center">
  <div className="fotter">
  <div class="row gx-5">
    
    <div class="col-md">
      <div className="secound">
      <img src={image12} style={{ width: "160px", height: "160px", borderRadius: "50%" }} alt="Logo" />
      </div>
    </div>

    <div class="col-md">
     <div className="first">
     <h3>About Elegance Tour</h3>
     <p>Your gateway to exploring Sri Lanka with expert local guides.</p>
                <p>Email: <a href="mailto:support@travora.com">support@travora.com</a></p>
                <p>Phone: +94 123 456 789</p>
     </div>
    </div>
    <div class="col-md">
      <div className="third"></div>
    </div>
  </div>
  </div>
</div>

</div>


</div>
  );
};

export default Homepage;