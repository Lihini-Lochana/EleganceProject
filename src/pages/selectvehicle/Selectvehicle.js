import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import './selectvehicle.css';
import Sidebar from '../../compornents/Sidebar';
import axios from 'axios';

const Selectvehicle = () => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/vehicles')
      .then(response => {
        setVehicles(response.data);
      })
      .catch(error => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  const filteredVehicles = vehicles.filter((v) => v.pacenger_count >= passengerCount);

  return (
    <div>
      <Sidebar />
      <div className='selectvehicle-background'>
        <div className='selectvehicle-content'>
          <div className="container-fluid bg-gradient-custom text-center">
            <h3 className="mb-4">Enter Your Passenger Count</h3>

            <div className="mb-3">
              <input
                type="number"
                min="1"
                max="10"
                value={passengerCount}
                className="form-control w-25 mx-auto text-center"
                onChange={(e) => setPassengerCount(Number(e.target.value))}
              />
            </div>

            <div className="row">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.vehicle_id} className="col-md-3 mb-3" style={{ width: "300px" }}>
                  <div className="card shadow-sm">
                    <img 
                      src={`data:image/jpeg;base64,${vehicle.vehicle_pic}`} 
                      alt={vehicle.vehicle_name} 
                      className="card-img-top" 
                      style={{ height: "160px", objectFit: "cover" }} 
                    />
                    <div className="card-body">
                      <h5 className="card-title">{vehicle.vehicle_name}</h5>
                      <p className="card-text">
                        <strong>{vehicle.price}$</strong> <br />
                        Extra 1KM / 150 LKR
                      </p>
                     {/* <button className="btn btn-primary w-100" onClick={() => setSelectedVehicle(vehicle)}> */}
                     <button className="btn btn-primary w-100" onClick={() => {
  const vehicleWithImage = {
    ...vehicle,
    image: `data:image/jpeg;base64,${vehicle.vehicle_pic}`
  };
  setSelectedVehicle(vehicleWithImage);
}}
>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-4">
              Total Cost: <span className="text-danger">{selectedVehicle ? `${selectedVehicle.price}$` : "0$"}</span>
            </h3>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-dark" onClick={() => navigate("/Cart")}>
                ⬅ Back
              </button>
              <button className="btn btn-success px-4" onClick={() => {
                if (selectedVehicle) {
                  localStorage.setItem("selectedVehicle", JSON.stringify(selectedVehicle));
                  localStorage.setItem("vehicleprice", selectedVehicle.price);
                  navigate("/Tourbooking");
                }
              }}>
                Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectvehicle;



