import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './selectplaces.css';
import Sidebar from '../../compornents/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const Selectplaces = () => {
  const [packages, setPackages] = useState([]);
  const [topic, setTopic] = useState();
  const navigate = useNavigate();
  
 
  useEffect(() => {
    const storedData = localStorage.getItem("selectedPackage",packages.tour_topicnumber);
    const topic_tittle = localStorage.getItem("topic");

    if (storedData) {
      setPackages(JSON.parse(storedData));
      setTopic(topic_tittle);
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/tour-topics')
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        
        if (Array.isArray(data)) {
          setPackages(data);
        } else if (data.data && Array.isArray(data.data)) {
          setPackages(data.data);
        } else {
          console.error("Unexpected data format:", data);
          setPackages([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
        setPackages([]);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className='selectplaces-content'>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Select Your Preferences</h1>
        <br />

        {Array.isArray(packages) && packages.length > 0 ? (
          packages.map((pkg) => (
            <div key={pkg.tour_topicnumber}>
              <span
                className="badge text"
                style={{
                  height: "40px",
                  width: "fit-content",
                  padding: "10px 20px",
                  fontSize: "20px",
                  backgroundColor: "#5A4FCF",
                  color: "black",
                }}
              >
                <div style={{display:"block"}}><span style={{display:"none"}}> {pkg.tour_topicnumber}</span>{pkg.package_name} - {pkg.duration}</div>
               
              </span>

              <div className="container text-center mt-2 mb-4">
                <div className="row align-items-start">
                  <div className="col-sm-9">
                    <div className="select-discribe">
                      {pkg.description}
                    </div>
                  </div>
                  <div className="col-sm-3">
                    
                   

                     <button
                     className="select-button"
  variant="outline-success"
  onClick={() => {
    localStorage.setItem("topic", pkg.package_name);
    localStorage.setItem("duration", pkg.duration);
    localStorage.setItem("selectedPackage", pkg.tour_topicnumber);
    navigate("/Addtocart");
  }}
>
  Add Places
</button> 
                    
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No packages found.</div>
        )}
      </div>
    </div>
  );
};


export default Selectplaces;


