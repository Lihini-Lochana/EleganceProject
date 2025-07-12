import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './tourbooking.css'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../compornents/Sidebar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import sigiriya from '../../images/Sigiriya.jpg';
import siripada from '../../images/siripada.png';
import daladamaligawa from '../../images/daladamaligawa.jpg';
import kdh from '../../images/kdh.png';



const Tourbooking= () =>{

  const[formdata , setFormdata]= useState({email: "",name: "",date:"", time:"" ,contact_number:"",places_names:"", vehicle:"", cost:""});


  const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
            setFormdata(prev => ({ ...prev, email: storedEmail }));
        }
    }, []);

  const navigate = useNavigate();

  const [selectedPlaces, setSelectedPlaces] = useState([]);

  useEffect(() => {
      const storedPlaces = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
      setSelectedPlaces(storedPlaces);

      setFormdata(prev => ({
        ...prev,
        places_names: storedPlaces.map(place => place.name).join(", ")
      }));
  }, []);


  const [selectedVehicle, setSelectedVehicle] = useState(null);



useEffect(() => {
  const storedVehicle = JSON.parse(localStorage.getItem("selectedVehicle"));
  if (storedVehicle) {
    setSelectedVehicle(storedVehicle);
    setFormdata(prev => ({
      ...prev,
      vehicle: storedVehicle.vehicle_name // Use correct field
    }));
  }
}, []);



// Set cost
useEffect(() => {
  const storedCost = localStorage.getItem("vehicleprice");
  if (storedCost) {
    setFormdata(prev => ({
      ...prev,
      cost: storedCost
    }));
  }
}, []);





const handleChange = (e) => {
  setFormdata({ ...formdata, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8080/api/bookings/tour/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });
    
    if (response.ok) {
      alert("Booking Successful!");
      const bookingKey = `bookingStartTime_${formdata.email}`;
      localStorage.setItem(bookingKey, new Date().getTime());
      navigate("/Bookingpending");
    } else {
      alert("Booking Failed!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
};




useEffect(() => {
  const fetchUserData = async () => {
    if (!email) return;

    try {
      const response = await fetch(`http://localhost:8080/api/signup/getbyemail/${email}`);
      if (response.ok) {
        const data = await response.json();
        setFormdata(prev => ({
          ...prev,
          name: data.username,
          contact_number: data.contact_Number
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchUserData();
}, [email]);

const cost = localStorage.getItem("vehicleprice");
    return(
        <div>
            <div className='tourbooking-background'>
         <Sidebar></Sidebar>
         <form onSubmit={handleSubmit}>
         <div className='tourbooking-content' style={{padding:"10px 30px"}}>
         
           <h2 style={{display:"none"}}>Welcome, {email}</h2>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label"><b>Name</b></label>
            <div class="col-sm-6">
      
               <input type="text" class="form-control" name="name"  value={formdata.name} onChange={handleChange}    required disabled></input>
            </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label"><b>Date</b></label>
             <div class="col-sm-6">
              <input type="date" class="form-control" name="date" onChange={handleChange} required></input>
             </div>
           </div>

  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label"><b>Time</b></label>
    <div class="col-sm-6">
      <input type="time" class="form-control"  name="time" onChange={handleChange} required></input>
    </div>
  </div>

  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label"><b>Contact Number</b></label>
    <div class="col-sm-6">
      <input type="number" class="form-control" name="contact_number" value={formdata.contact_number || ""} onChange={handleChange} required disabled></input>
    </div>
  </div>
 
    </div>
   
<div class="container">
  <div className='choiceitems'>
  <div class="row gx-5">
    <div class="col-sm-8">
     <div className='tour-places'>
      
      <div class="container px-4 text-center">
       

<b>Your Selected Places</b>
                <div className="row g-3" style={{paddingLeft:"20px"}}>
                    {selectedPlaces.length === 0 ? (
                        <p>No places selected.</p>
                    ) : (
                        selectedPlaces.map((place, index) => (
                            <div className="col-4" key={index}>
                                <div className="p-3" style={{paddingLeft:"100px"}}>
                                    <img src={place.image} alt={place.name} />
                                    <p>{place.name}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                </div>

     </div>
    </div>
    <div class="col-sm-4">
      <div class="p-3">
       <b style={{textAlign:"center"}}>Your Vehicle</b> 

        <br/>
        {/*<img src={kdh} style={{height:"200px",width:"200px"}}></img> */}

        <img
  src={selectedVehicle ? selectedVehicle.image : kdh}
  alt="Selected Vehicle"
  style={{ height: "150px", width: "200px" }}
  required
/>
<br />
<div style={{ fontWeight: "bold", fontSize: "16px" }}>
      {selectedVehicle ? selectedVehicle.vehicle_name : "No Vehicle Selected"}
    </div>
      </div>
    </div>
    </div>
    
    <div className='tour-cost'>Your Price: {cost}</div>
  </div>
</div>

    <div className='tourbooking-booking-buttonset'>
       <div class="container text-center">
          <div class="row align-items-center">
            <div className='col-sm-2'>
             <div class="tourbooking-back">
               <i class="bi bi-arrow-left-circle" onClick={() => navigate("/Selectvehicle")}></i>
             </div>
            </div>
            <div class="col-sm-5">
               <div className='tourbooking-cancel'>
               Cancel
               </div>
            </div>
            <div class="col-sm-5">
             <button type="submit" className='tourbooking-booking'>
                Booking
               </button>
            </div>
            
          </div>
         
          
        </div>
      
    </div>
   </form>
    </div>
  
        </div>
      
      
    );
};

export default Tourbooking;