/* global google */
import React, { Component } from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
} from 'react-google-maps';
import throttle from 'lodash.throttle';
import debounce from 'lodash.throttle';

import Geocode from 'react-geocode';
//import Autocomplete from 'react-google-autocomplete';
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
      directions: null,
      lineCoordinates: null,
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    //this.handleMapLoad = throttle(this.handleMapLoad, 5000);
    //this.handleMapLoad = debounce(this.handleMapLoad, 10000);
  }

  handleMapLoad() {
    //this.mapComponent = map;
    //this._mapComponent = map;

    // Get route between the two addresses
    const DirectionsService = new google.maps.DirectionsService();

    const origin = {
      lat: this.state.storeMarker.lat,
      lng: this.state.storeMarker.lng,
    };
    const destination = {
      lat: this.state.customerMarker.lat,
      lng: this.state.customerMarker.lng,
    };

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const overViewCoords = result.routes[0].overview_path;

          this.setState({
            directions: result,
            lineCoordinates: overViewCoords,
          });
        } else {
          console.log(`error fetching directions ${status}`);
        }
      }
    );
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
  }

  render() {
    // Create several markers
    const markers = [this.state.customerMarker, this.state.storeMarker];

    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          ref={props.onMapLoad}
          //ref={this.onMapLoad}
          //onMapLoad={props.onMapLoad}
          //onMapLoad={this.handleMapLoad}
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
          {this.state.directions && (
            <DirectionsRenderer
              directions={this.state.directions}
              options={{ suppressMarkers: true, suppressInfoWindows: true }}
            />
          )}
        </GoogleMap>
      ))
    );
    return (
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onMapLoad={this.handleMapLoad}
      />
    );
  }
}

export default Map;
// <Autocomplete types={['address']} />
