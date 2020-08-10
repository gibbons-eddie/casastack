/* global google */
import React, { useEffect } from 'react';
import { DirectionsRenderer } from 'react-google-maps';

function MyDirectionsRenderer(props) {
  const [directions, setDirections] = React.useState(null);
  const { origin, destination, travelMode } = props;

  const DirectionsService = new google.maps.DirectionsService();

  useEffect(() => {
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
      [directions]
    );

    // check
    console.log('MyDirectionsRenderer executed (useEffect)');
  }, []);

  return (
    // check
    <React.Fragment>
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true, suppressInfoWindows: true }}
        />
      )}
    </React.Fragment>
  );
}

export default MyDirectionsRenderer;
