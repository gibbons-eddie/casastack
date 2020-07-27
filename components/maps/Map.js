/* global google */
import React from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import MyDirectionsRenderer from './MyDirectionsRenderer';

Geocode.setApiKey(process.env.MAPS_API_KEY);

// Helper function for calculating distance
var rad = (x) => {
  return (x * Math.PI) / 180;
};

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
    Geocode.fromAddress(this.props.listingObj.location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          storeMarker: {
            name: 'Store',
            id: 1,
            address: this.props.listingObj.location,
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
    Geocode.fromAddress(this.props.listingObj.ownerAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          customerMarker: {
            name: 'Customer',
            id: 2,
            address: this.props.listingObj.ownerAddress,
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

    var distance = () => {
      // Calculates distance between two places based on their longitude and latitude
      var R = 3958.8; // Earth's radius in miles
      var distanceLat = rad(
        this.state.customerMarker.lat - this.state.storeMarker.lat
      );
      var distanceLong = rad(
        this.state.customerMarker.lng - this.state.storeMarker.lng
      );
      var a =
        Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
        Math.cos(rad(this.state.storeMarker.lat)) *
          Math.cos(rad(this.state.customerMarker.lat)) *
          Math.sin(distanceLong / 2) *
          Math.sin(distanceLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in miles
      return d;
    };

    // this.setDistance();

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

    var url =
      'https://www.google.com/maps/dir/?api=1&origin=' +
      this.state.storeMarker.lat +
      ',' +
      this.state.storeMarker.lng +
      '&destination=' +
      this.state.customerMarker.lat +
      ',' +
      this.state.customerMarker.lng;

    return (
      <div>
        <div>
          Distance between you and the nearest hardware store is{' '}
          {Math.round(distance() * 100) / 100} miles.
        </div>
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <br></br>
        <a class='destination-link' href={url} target='_blank'>
          Click for direction to customer address
        </a>
      </div>
    );
  }
}

export default Map;
