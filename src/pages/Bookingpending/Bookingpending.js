import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bookingpending.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Bookingpending = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    const key = `bookingStartTime_${email}`;
    let startTime = localStorage.getItem(key);

    if (!startTime) return; // No timer started for this user

    const countdownDuration = 48 * 60 * 60 * 1000; // 48 hours

    const updateTimer = () => {
      const now = new Date().getTime();
      const elapsed = now - parseInt(startTime);
      const remaining = Math.max((countdownDuration - elapsed) / 1000, 0);
      setTimeLeft(Math.floor(remaining));
    };

    updateTimer(); // run immediately
    const timer = setInterval(updateTimer, 1000); // every second

    return () => clearInterval(timer);
  }, [email]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='bookingpending-background'>
      <div className='bookingpending-box'>
        <h2>Your Booking is Pending!</h2>
        <h3>You will receive a notification within 2 days</h3>
        <h1 style={{ marginTop: "15%", fontWeight: "bold", color: "red" }}>
          {timeLeft > 0 ? `${hours}h ${minutes}m ${seconds}s` : "EXPIRED"}
        </h1>
        <div style={{ marginTop: "90px", marginLeft: "350px" }}>
          <button type="button" className="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  );
};

export default Bookingpending;
