import React from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
//import Autocomplete from 'react-google-autocomplete';

Geocode.setApiKey(process.env.MAPS_API_KEY);

class Map extends React.Component {
  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={{ lat: 29.643633, lng: -82.354927 }}
        >
          <Marker position={{ lat: 29.643633, lng: -82.354927 }}>
            <InfoWindow>
              <div>Hello</div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      ))
    );

    return (
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

// <Autocomplete types={['address']} />
export default Map;
