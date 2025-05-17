export const calculateFare = (distance, pricePerKm) => {
    return (distance * pricePerKm).toFixed(2);
  };