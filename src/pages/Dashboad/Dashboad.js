import React from "react";
import Sidebar from "../../compornents/Sidebar";
import "./dashboad.css";

const HomePage = () => {
  return (
    <div className="home-container-dashboad">
     <Sidebar />
      <div className="main-content-dashboad">
        <div className="profile-card-dashboad">
          <img 
            src="https://p7.hiclipart.com/preview/481/915/760/computer-icons-user-avatar-woman-avatar.jpg" 
            alt="Profile Avatar" 
            className="avatar-dashboad"
          />
          <div className="profile-info-dashboad">
            <h2 className="owner-name-dashboad">Owner Profile</h2>
            <p className="owner-role-dashboad">Travel Expert | Tour Organizer</p>
            <div className="owner-section-dashboad">
              <h3>Experiences:</h3>
              <ul>
                <li>Multilingual Support</li>
                <li>Personalized Service</li>
                <li>Memory Maker</li>
              </ul>
            </div>
            <p className="quote-dashboad">"Travel isn’t just a hobby — it’s a way to bring stories to life."</p>
          </div>
        </div>

        <div className="gallery-dashboad">
          <img src="https://i.pinimg.com/236x/e6/5f/84/e65f84d23cbbab2560502a1d5b390b73.jpg" alt="Waterfall" />
          <img src="https://i.pinimg.com/736x/c9/de/89/c9de897da5a4c27ca2d48764cf5697a5.jpg" alt="Mountain" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUB1A8qS0QRcPuNvyM1OpcAqEmvtlQ1Cytg&s" alt="Historical Place" />
          <img src="https://static.saltinourhair.com/wp-content/uploads/2017/04/23155119/Things-To-Do-Mirissa-Sri-Lanka-secret-beach-sunset.jpg" alt="Landscape" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;