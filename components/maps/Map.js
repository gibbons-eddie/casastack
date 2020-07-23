/* global google */
import React, { Component } from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';

import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.MAPS_API_KEY);

function MyDirectionsRenderer(props) {
  const [directions, setDirections] = React.useState(null);
  const { origin, destination, travelMode } = props;

  const DirectionsService = new google.maps.DirectionsService();

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
  console.log('this function executed');

  return (
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
class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customerMarker: {
        name: '',
        id: 0,
        address: '',
        lat: 0,
        lng: 0,
      },
      storeMarker: {
        name: '',
        id: 0,
        address: '',
        lat: 0,
        lng: 0,
      },
      directions: null,
    };
  }

  componentDidMount() {
    // get coordinates of the store address
    Geocode.fromAddress(this.props.storeAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          storeMarker: {
            name: 'Store',
            id: 1,
            address: this.props.storeAddress,
            lat: lat,
            lng: lng,
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );

    // get coordinates of the customer address
    Geocode.fromAddress(this.props.customerAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          customerMarker: {
            name: 'Customer',
            id: 2,
            address: this.props.customerAddress,
            lat: lat,
            lng: lng,
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
    //
  }

  render() {
    // Create several markers
    const markers = [this.state.customerMarker, this.state.storeMarker];

    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{
            lat: this.state.storeMarker.lat,
            lng: this.state.storeMarker.lng,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
            >
              <InfoWindow>
                <div>
                  <p>{marker.name}</p>
                  <p>{marker.address}</p>
                </div>
              </InfoWindow>
            </Marker>
          ))}

          <MyDirectionsRenderer
            origin={{
              lat: this.state.storeMarker.lat,
              lng: this.state.storeMarker.lng,
            }}
            destination={{
              lat: this.state.customerMarker.lat,
              lng: this.state.customerMarker.lng,
            }}
            travelMode={google.maps.TravelMode.DRIVING}
          />
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

export default Map;
