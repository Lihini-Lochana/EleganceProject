import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link ,useLocation} from 'react-router-dom';
import './sidebar.css';
import image12 from "../images/newlogo.jpeg";
import 'bootstrap-icons/font/bootstrap-icons.css';


const Dashboad = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
   

  };

  return (
    <div>
      
      <div className="sidebar">
        <div className="row" style={{ margin: '15px 0' }}>
          <div className="col-sm">
            <img
              src={image12}
              style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '5px' }}
              alt="Logo"
            />
          </div>
          
        </div>
        <hr />
        <Link to="/Dashboad" className={location.pathname === "/Dashboad" ? "active" : ""} href="#home">
        <i class="bi bi-house-fill"></i>Dashboad
        </Link>
        <Link to="/DropService" href="#home" className={location.pathname === "/DropService" ? "active" : ""}>
        <i class="bi bi-car-front"></i>Drop
        </Link>
        <Link to="/Tourcatagory" href="#home" className={location.pathname === "/Tourcatagory" ? "active" : ""}>
        <i class="bi bi-luggage-fill"></i>Tour
        </Link>
        <Link to="/Userprofile" href="#home" className={location.pathname === "/Userprofile" ? "active" : ""}>
          <i className="bi bi-person-square"></i>Profile
        </Link>
        <Link to="/Notification" href="#home" className={location.pathname === "/Notification" ? "active" : ""}>
          <i className="bi bi-person-square"></i>Notifications
        </Link>
        <div className="logoutbutton">
          <hr />
          <Link to="/" href="#home">
            <i className="bi bi-box-arrow-left"></i>Logout
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`sidebar2 ${isSidebarOpen ? 'open' : ''}`}
      >
        <button className="closebtn" onClick={toggleSidebar}>
        <i class="bi bi-x-lg"></i>
        </button>

         <div style={{marginTop:"35px"}}>
        <a href="#about"> <i class="bi bi-house-fill"></i>Home</a>
        <a href="#services">  <i class="bi bi-car-front"></i>Drop</a>
        <a href="#clients"><i class="bi bi-luggage-fill"></i>Tour</a>
        <a href="#contact"><i className="bi bi-person-square"></i>Profile</a>
        <div className="logoutbutton2">
          <hr />
          <a href="#logout">
            <i className="bi bi-box-arrow-left"></i>Logout
          </a>
        </div>
        </div>
        </div>

      {/* Main Content */}
      
       {/* <div id="main2">*/}
          <div className="openbtn">
            <div className='row' style={{marginTop:"10px"}}>
              <div className='col' style={{ marginLeft:"10px"}}>
              <img
              src={image12}
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight:"-50px"}}
              alt="Logo" 
            />
              </div>
              <div className='col' style={{marginTop:"20px"}}>
                <button className="toglebutton" onClick={toggleSidebar} style={{marginLeft:"150px"}}>
                <i class="bi bi-list"></i> 
               </button>
               </div>
          </div>
          </div>
          

    </div>
  );
};

export default Dashboad;
