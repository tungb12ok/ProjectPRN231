import React, { useEffect, useState } from "react";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const DistanceCalculator = ({ userAddress, onDistanceCalculated }) => {
  const [distance, setDistance] = useState(null);

  const haversineDistance = (coords1, coords2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(coords2.lat - coords1.lat);
    const dLng = toRadians(coords2.lng - coords1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(coords1.lat)) * Math.cos(toRadians(coords2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  const geocodeAddress = async (address) => {
    const apiKey = "sk.eyJ1IjoiYWlvbmlhYWEiLCJhIjoiY2x4NmFidXgzMDY4ZzJsc2dxOHI4YnE1aiJ9.BXzZ-TxzkyadTw7uEuDwTQ";
    const geocodingClient = mbxGeocoding({ accessToken: apiKey });
    try {
      const response = await geocodingClient.forwardGeocode({
        query: address,
        limit: 1
      }).send();

      if (response && response.body && response.body.features && response.body.features.length > 0) {
        const location = response.body.features[0].geometry.coordinates;
        return { lat: location[1], lng: location[0] };
      } else {
        throw new Error("No results found for the provided address.");
      }
    } catch (error) {
      console.error("Error geocoding address:", error.message);
      throw new Error("Unable to geocode address");
    }
  };

  useEffect(() => {
    const calculateDistance = async () => {
      if (userAddress) {
        try {
          const userCoords = await geocodeAddress(userAddress);
          const defaultCoords = await geocodeAddress('Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương, Vietnam');

          const calculatedDistance = haversineDistance(userCoords, defaultCoords);
          setDistance(calculatedDistance);
          // console.log("Calculated Distance:", calculatedDistance);
          onDistanceCalculated(calculatedDistance);
        } catch (error) {
          console.error('Error calculating distance:', error);
        }
      }
    };

    calculateDistance();
  }, [userAddress, onDistanceCalculated]);

  return null;
};

export default DistanceCalculator;
