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
    return x * Math.PI / 180;
};

// Calculates distance between two places based on their longitude and latitude
var distance = (placeOne, placeTwo) => {
    var R = 6378137;
    var distanceLat = rad(placeTwo.lat() - placeOne.lat());
    var distanceLong = rad(placeTwo.lng() - placeOne.lng());
    var a = Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
        Math.cos(rad(placeOne.lat())) * Math.cos(rad(placeTwo.lat())) *
        Math.sin(distanceLong / 2) * Math.sin(distanceLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;                   // Distance in meters
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
            distance: 0,
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
        this.props.distance = distance(this.props.customerMarker, this.props.storeMarker);
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
