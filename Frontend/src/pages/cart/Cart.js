import React, { useState ,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './cart.css'
import Sidebar from '../../compornents/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';


const Cart= () =>{
    const navigate = useNavigate();
    const topic = localStorage.getItem("topic");
    const duration = localStorage.getItem("duration");

  const [cart, setCart] = useState([]);

 
  useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(savedCart);
  }, []);

  
  const removeFromCart = (index) => {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

    return(
        <div>
         <Sidebar></Sidebar>
         <div className='cart_content'>
            
         <div class="container text-center">

       <h1 style={{textAlign:"center",fontWeight:"bold"}}>Select Your Preferences</h1>
       <span class="badge text" style={{height:"40px",width:"170px",paddingTop:"10px",fontSize:"20px",backgroundColor:"#5A4FCF",color:"black",margin:"auto"}}>{topic}</span>
      

<div className="row g-2 gy-2">
                        {cart.length === 0 ? (
                            <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>No places selected.</p>
                        ) : (
                            cart.map((place, index) => (
                                <div className="col-sm-4" key={index}>
                                    <div className="p-3">
                                        <div className='cart_images'>
                                            <img src={place.image} alt={place.name} />
                                            <div className='cart-add'>
                                                <i className="bi bi-trash3" onClick={() => removeFromCart(index)}></i>
                                            </div>
                                            <p>{place.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
</div>


<div className='cart-buttonset' style={{marginLeft:"20%"}}>
       <div class="container text-center">
          <div class="row align-items-center">
            <div className='col-2'>
             <div class="cart-back">
              <Link to="/Addtocart">
               <i class="bi bi-arrow-left-circle"></i>
               </Link>
             </div>
            </div>
            <div class="col-5">
               <div className='cart-addmore'>
                Add More
               </div>
            </div>
            <div className="col-5">
    <div
        className="cart-finished"
        onClick={() => {
            if (cart.length > 0) {
                localStorage.setItem('selectedPlaces', JSON.stringify(cart));
                navigate("/Selectvehicle");
            } else {
                alert("Please select at least one place before finishing.");
            }
        }}
        
    >
        Finish
    </div>
</div>

          </div>
        </div>
    </div>


         </div>
        </div>
    );
};

export default Cart;