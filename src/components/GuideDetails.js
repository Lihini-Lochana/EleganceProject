import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GuideDetails.css'; 

const GuideDetails = () => {
  const { guideId } = useParams();
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/guides/${guideId}`)
      .then(({ data }) => setGuide(data))
      .catch((err) => {
        console.error("Failed to fetch guide details", err);
        setError("Could not load guide details.");
      });
  }, [guideId]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!guide) return <p>Loading guide details...</p>;

  return (
    <div className="guide-details-container">
      <h2 className="guide-details-title">Guide Details</h2>
      {guide.imageUrl && (
        <img
          src={`http://localhost:8080${guide.imageUrl}`}
          alt={guide.name}
          className="guide-image"
        />
      )}
      <p><strong>Name:</strong> {guide.name}</p>
      <p><strong>Phone:</strong> {guide.phone}</p>
      <p><strong>Email:</strong> {guide.email}</p>
      <p><strong>Address:</strong> {guide.address}</p>
    </div>
  );
};

export default GuideDetails;
