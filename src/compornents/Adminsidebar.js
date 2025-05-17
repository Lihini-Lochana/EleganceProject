import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link ,useLocation} from 'react-router-dom';
import './adminsidebar.css';
import image12 from '../images/logo2.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Dashboad = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
   

  };

  return (
    <div>
      
      <div className="sidebar-admin">
        <div className="row" style={{ margin: '55px 0' }}>
         
          
        </div>
        
        <Link to="/Homepage" className={location.pathname === "/Homepage" ? "active" : ""} href="#home">
        <i class="bi bi-house-fill"></i>Home
        </Link>
        <Link to="/Admindropitems" href="#home" className={location.pathname === "/Admindropitems" ? "active" : ""}>
        <i class="bi bi-car-front"></i>Drop
        </Link>
        <Link to="/Tourcatagory" href="#home" className={location.pathname === "/Tourcatagory" ? "active" : ""}>
        <i class="bi bi-luggage-fill"></i>Pre Desinged
        </Link>
        <Link to="/Admintourdiscription" href="#home" className={location.pathname === "/Admintourplaces" ? "active" : ""}>
          <i className="bi bi-person-square"></i>Custormize
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
