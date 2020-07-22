/* global google */
import React, { Component } from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.MAPS_API_KEY);

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
