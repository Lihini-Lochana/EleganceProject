import React, { useState, useEffect } from "react";
import axios from "axios";

const PackagePlace = ({ setPackagePlaces, packagePlaces, totalNights }) => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  const [durationNights, setDurationNights] = useState(1);
  const [placeDetails, setPlaceDetails] = useState({}); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/places")
      .then((res) => setAllPlaces(res.data))
      .catch((err) => console.error("Error fetching places:", err));
  }, []);

  useEffect(() => {
    if (packagePlaces.length > 0) {
      const placeIds = packagePlaces.map((p) => p.placeId);
      const uniquePlaceIds = [...new Set(placeIds)]; 

      const placeRequests = uniquePlaceIds.map((placeId) =>
        axios.get(`http://localhost:8080/api/places/${placeId}`)
      );

      Promise.all(placeRequests)
        .then((responses) => {
          const placeDetailsMap = responses.reduce((acc, response) => {
            const place = response.data;
            acc[place.id] = place; 
            return acc;
          }, {});
          setPlaceDetails(placeDetailsMap); 
        })
        .catch((err) => {
          console.error("Error fetching place details:", err);
        });
    }
  }, [packagePlaces]);

  const handleAddPlace = () => {
    if (!selectedPlaceId || durationNights <= 0) {
      alert("Select a place and a valid number of nights");
      return;
    }

    const totalAssigned = packagePlaces.reduce(
      (sum, p) => sum + p.durationNights,
      0
    );

    if (totalAssigned + parseInt(durationNights) > parseInt(totalNights)) {
      alert(`Total assigned nights (${totalAssigned + parseInt(durationNights)}) exceed the package limit of ${totalNights}`);
      return;
    }

    const newPlace = {
      placeId: parseInt(selectedPlaceId),
      durationNights: parseInt(durationNights),
    };

    setPackagePlaces([...packagePlaces, newPlace]);
    setSelectedPlaceId("");
    setDurationNights(1);
  };

  return (
    <div>
      <h3>Package Places</h3>
      <div>
        <label>Select Place:</label>
        <select
          value={selectedPlaceId}
          onChange={(e) => setSelectedPlaceId(e.target.value)}
        >
          <option value="">-- Select a Place --</option>
          {allPlaces.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Duration Nights:</label>
        <input
          type="number"
          value={durationNights}
          onChange={(e) => setDurationNights(e.target.value)}
        />
      </div>

      <button type="button" onClick={handleAddPlace}>Add Place</button>

      <p>
        Total Assigned Nights: {packagePlaces.reduce((sum, p) => sum + p.durationNights, 0)} / {totalNights}
      </p>

      <ul>
        {packagePlaces.map((p, i) => {
          const place = placeDetails[p.placeId];
          return (
            <li key={i}>
              <strong>{place ? place.name : "Loading place name..."}</strong> - Nights: {p.durationNights}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PackagePlace;
