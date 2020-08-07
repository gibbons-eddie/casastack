function displayDistance({ customerMarker, locationMarker, isDelivery }) {
  // locationCoordiantes: store or volunteer coordinates, dpendending on listing type

  // Helper function for calculating distance
  var rad = (x) => {
    return (x * Math.PI) / 180;
  };

  var distance = () => {
    // Calculates distance between two places based on their longitude and latitude
    var R = 3958.8; // Earth's radius in miles
    var distanceLat = rad(customerMarker.lat - locationMarker.lat);
    var distanceLong = rad(customerMarker.lng - locationMarker.lng);
    var a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(rad(locationMarker.lat)) *
        Math.cos(rad(customerMarker.lat)) *
        Math.sin(distanceLong / 2) *
        Math.sin(distanceLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in miles
    return d;
  };

  return (
    <div>
      {isDelivery ? (
        <>
          Distance between you and the nearest hardware store is{' '}
          {Math.round(distance() * 100) / 100} miles.
        </>
      ) : (
        <>
          Distance between volunteer and customer is{' '}
          {Math.round(distance() * 100) / 100} miles.
        </>
      )}
    </div>
  );
}

export default displayDistance;
