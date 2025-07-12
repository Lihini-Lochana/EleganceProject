import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tourPackageService from '../services/TourPackageService';
import packagePlaceService from '../services/PackagePlaceService';
import placeService from '../services/PlaceService';
import './ViewSeasonPackages.css';
import { useBooking } from '../context/BookingContext';


function ViewSeasonPackages() {
  const { seasonId } = useParams();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const { updateBooking } = useBooking();


  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await tourPackageService.getTourPackagesBySeason(seasonId);
        const packagesWithPlaces = await Promise.all(
          response.data.map(async (pkg) => {
            const placesResponse = await packagePlaceService.getPackagePlacesByTourPackageId(pkg.id);
            const placeNames = await Promise.all(
              placesResponse.data.map(async (packagePlace) => {
                const placeResponse = await placeService.getPlaceById(packagePlace.placeId);
                return placeResponse.data.name;
              })
            );
            return { ...pkg, placeNames };
          })
        );
        setPackages(packagesWithPlaces);
      } catch (error) {
        console.error('Error fetching packages', error);
      }
    };
    fetchPackages();
  }, [seasonId]);


  const handleViewPackageDetails = (packageId) => {
    updateBooking({ tourPackageId: packageId }); 
    navigate(`/view-package-details/${packageId}`);
  };

  return (
    <div className="season-packages-container">
  <h2>Tour Packages - Season {seasonId}</h2>
  <div className="packages-list">
    {packages.length > 0 ? (
      packages.map((pkg) => (
        <div key={pkg.id} className="package-card">
          <h3>{pkg.name}</h3>
          <p>Total Kilometers: {pkg.totalKilometers} km</p>
          <p>Pickup Location: {pkg.pickupLocation}</p>
          <p>Drop Location: {pkg.dropLocation}</p>
          <h4>Places:</h4>
          <ul>
            {pkg.placeNames.map((place, index) => (
              <li key={index}>{place}</li>
            ))}
          </ul>
          <button className="see-more-btn" onClick={() => handleViewPackageDetails(pkg.id)}>
            See More
          </button>
        </div>
      ))
    ) : (
      <p>No packages available for this season.</p>
    )}
  </div>
</div>

  );
}

export default ViewSeasonPackages;