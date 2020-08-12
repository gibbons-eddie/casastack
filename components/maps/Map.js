/* global google */
import React from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import MyDirectionsRenderer from './MyDirectionsRenderer';
import DisplayDistance from './DisplayDistance';

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
      showOnePin: false,
    };
  }

  componentDidMount() {
    // If service is a delivery, get store and customer coordinates
    // listing status and logged in user role does not matter
    if (this.props.listingObj.service === 'delivery') {
      // get coordinates of the store address
      this.setState({
        storeMarker: {
          name: 'Store',
          id: 1,
          address: this.props.listingObj.location,
          lat: this.props.listingObj.locationLat,
          lng: this.props.listingObj.locationLng,
        },
      });
    } else {
      // If listing is a service, check listing status
      if (this.props.listingObj.status === 'open') {
        // if this listing is OPEN, check the role of the user
        if (this.props.user.role === 'volunteer') {
          // if a volunteer is logged in, show 2 pins: volunteer's address (user.address) and customer's address
          // so the volunteer can visualize their potential route (volunteer has not accepted this listing yet)
          this.setState({
            storeMarker: {
              name: 'You (volunteer)',
              id: 1,
              address: this.props.user.address,
              lat: this.props.user.lat,
              lng: this.props.user.lng,
            },
          });
        } else {
          // if a customer/admin/root is logged in, show 1 pin: customer's address
          // because no volunteer has accepted this listing (service) yet
          this.setState({ showOnePin: true });
        }
      } else if (this.props.listingObj.status === 'accepted') {
        // if this listing is ACCEPTED, logged in user role does not matter
        // Show 2 pins: listing obj's location and customer's address
        this.setState({
          storeMarker: {
            name: 'Volunteer',
            id: 1,
            address: this.props.listingObj.location,
            lat: this.props.listingObj.locationLat,
            lng: this.props.listingObj.locationLng,
          },
        });
      }
    }
    // get coordinates of the customer address
    this.setState({
      customerMarker: {
        name: 'Customer',
        id: 2,
        address: this.props.listingObj.ownerAddress,
        lat: this.props.listingObj.ownerLat,
        lng: this.props.listingObj.ownerLng,
      },
    });
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
          {this.state.showOnePin ? (
            <Marker
              key={this.state.customerMarker.id}
              position={{
                lat: this.state.customerMarker.lat,
                lng: this.state.customerMarker.lng,
              }}
            >
              <InfoWindow>
                <div>
                  <p>{this.state.customerMarker.name}</p>
                  <p>{this.state.customerMarker.address}</p>
                </div>
              </InfoWindow>
            </Marker>
          ) : (
            <>
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
            </>
          )}
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
        {this.state.showOnePin ? null : (
          <DisplayDistance
            customerMarker={{
              lat: this.state.customerMarker.lat,
              lng: this.state.customerMarker.lng,
            }}
            locationMarker={{
              lat: this.state.storeMarker.lat,
              lng: this.state.storeMarker.lng,
            }}
            isDelivery={
              this.props.listingObj.service === 'delivery' ? true : false
            }
          />
        )}

        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <br></br>
        <a className='destination-link' href={url} target='_blank'>
          Directions
        </a>
      </div>
    );
  }
}

export default Map;
