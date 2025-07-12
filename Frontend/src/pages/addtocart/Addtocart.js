import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './addtocart.css';
import Sidebar from '../../compornents/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useNavigate } from 'react-router-dom';

const Selectplaces = () => {

  const navigate = useNavigate();
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [activePlace, setActivePlace] = useState(null);
  const tour_topicnumber = localStorage.getItem("selectedPackage");

  const topic = localStorage.getItem("topic");
  const duration = localStorage.getItem("duration");

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart')) || [];
    setSelectedPlaces(saved);
  }, []);

  // Save to localStorage when selectedPlaces changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(selectedPlaces));
  }, [selectedPlaces]);

  // Fetch data from backend
  useEffect(() => {
    if (!tour_topicnumber) return;

    fetch(`http://localhost:8080/api/tourplaces/add/${tour_topicnumber}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.error("Error fetching places:", err));
  }, [tour_topicnumber]);

  const addToCart = (place) => {
    if (selectedPlaces.some((p) => p.name === place.tourplace_name)) return;

    const newPlace = {
      name: place.tourplace_name,
      image: `data:image/jpeg;base64,${place.tourplace_pic}`,
      description: place.tourplace_discription,
    };

    const updated = [...selectedPlaces, newPlace];
    setSelectedPlaces(updated);
  };

  const handleOpenDetails = (place) => {
    setActivePlace(place);
  };

  const handleCloseDetails = () => {
    setActivePlace(null);
  };

  return (
    <div>
      <Sidebar />
      <div className='addtocart_content'>
        <p style={{display:"none"}}>{tour_topicnumber}</p>
        <span
                className="badge text"
                style={{
                  height: "40px",
                  width: "fit-content",
                  padding: "10px 20px",
                  fontSize: "20px",
                  backgroundColor: "#5A4FCF",
                  color: "black",
                  marginLeft:"300px"
                }}
              >
          <p>{topic}</p>
          </span>
        <div className="container text-center">
        <Link to="/Cart">
          <div className='select-seecart'>
           
              <i className="bi bi-cart-fill"></i> ADD TO CART
            
            <div className='select-seecartvalue'>{selectedPlaces.length}</div>
           
            {() => {
   
    navigate("/Cart");
  }}

          </div>
          </Link> 

          <div className='select-bell'>
            <i className="bi bi-bell-fill"></i>
          </div>

          <div className="row g-3">
            {places.map((place, index) => (
              <div className="col-sm-4" key={index}>
                <div className="p-3">
                  <div className='addtocart_images'>
                    <img
                      src={`data:image/jpeg;base64,${place.tourplace_pic}`}
                      onClick={() => handleOpenDetails(place)}
                      style={{
                        opacity: selectedPlaces.some((p) => p.name === place.tourplace_name) ? 0.5 : 1,
                        transition: "opacity 0.3s",
                      }}
                      alt={place.tourplace_name}
                    />
                    <div className='addtocart-add'>
                      <i className="bi bi-plus-lg" onClick={() => addToCart(place)}></i>
                    </div>
                    <p>{place.tourplace_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/Selectplaces">
          <div className='select-addmore'>
            
            Back
          </div>
          </Link>
        </div>
       
      </div>
      

      {/* Description Modal */}
      {activePlace && (
        <div className='sigiriya'>
          <i
            className="bi bi-x-circle-fill"
            onClick={handleCloseDetails}
            style={{
              marginTop: "-50px",
              marginLeft: "95%",
              fontSize: "35px",
              cursor: "pointer"
            }}
          ></i>
          <br />
          <img src={`data:image/jpeg;base64,${activePlace.tourplace_pic}`} alt="Details" />
          <div>{activePlace.tourplace_discription}</div>
        </div>
      )}
    </div>
  );
};

export default Selectplaces;
