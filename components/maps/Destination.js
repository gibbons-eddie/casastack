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

class Destination extends React.Component {
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
    var url = "https://www.google.com/maps/dir/?api=1&origin=" + this.state.storeMarker.lat + "," + this.state.storeMarker.lng + "&destination=" + this.state.customerMarker.lat + "," + this.state.customerMarker.lng;
    return (
        <a class="destination-link" href= {url} target="_blank">Click for direction to customer address</a>
    );
  }
}

export default Destination;
