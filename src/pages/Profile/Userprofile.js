import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './userprofile.css';
import defaultProfilePic from '../../images/default-profile.png';
import { FaBell } from 'react-icons/fa'; // Notification Icon
import  Sidebar from '../../compornents/Sidebar';

const Profile = () => {
  const storedEmail = localStorage.getItem("userEmail");
  useEffect(() => {
    const fetchUserData = async () => {
      if (!storedEmail) return;
  
      try {
        const response = await fetch(`http://localhost:8080/api/signup/getbyemail/${storedEmail}`);
        if (response.ok) {
          const data = await response.json();
          setUser((prev) => ({
            ...prev,
            username: data.username,
            phoneNumber: data.contact_Number,
            email: data.email,
            password:data.password, // add this if you get email from backend
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [storedEmail]);
  

  
  const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'storedEmail',
    phoneNumber: '+1 (555) 123-4567',
    profilePicture: defaultProfilePic,
   
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

 /* const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
*/



const handleSave = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/signup/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        contact_Number: user.phoneNumber,
        email: user.email,
        password: user.password
      })
    });

    if (response.ok) {
      alert("Profile updated successfully!");
      setIsEditing(false);
    } else {
      alert("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("An error occurred while updating the profile");
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };


  const handleClick = () => {
    navigate("/Notification"); // Navigate to tour plan page
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser((prev) => ({ ...prev, profilePicture: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
        <Sidebar />
        <div className='profile_main'>
    <div className="profile-container-profile">
      {/* Notification Icon */}
      <div className="notification-icon" onClick={handleClick}>
        <FaBell />
      </div>

      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>

        {/* Profile Picture */}
        <div className="profile-pic">
          <img 
            src={user.profilePicture} 
            alt="Profile" 
            className="profile-img"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = defaultProfilePic;
            }}
          />
          {isEditing && (
            <label htmlFor="profile-picture-upload" className="edit-icon">
              📷
            </label>
          )}
          <input
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Profile Details */}
        <div className="profile-info">
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={user.username} 
              onChange={handleInputChange} 
              disabled={!isEditing} 
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={user.email} 
              onChange={handleInputChange} 
              disabled={!isEditing} 
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input 
              type="tel" 
              name="phoneNumber" 
              value={user.phoneNumber} 
              onChange={handleInputChange} 
              disabled={!isEditing} 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="tel" 
              name="password" 
              value={user.password} 
              onChange={handleInputChange} 
              disabled={!isEditing} 
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
