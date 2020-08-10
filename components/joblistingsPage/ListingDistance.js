import React, { useState } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form, Segment, Container} from 'semantic-ui-react';
import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from 'react-google-maps';
  import Geocode from 'react-geocode';

  
Geocode.setApiKey(process.env.MAPS_API_KEY);

const ListingDistance = (props) => {
    console.log(props.user.address);
    const [userMarker, setUserMarker] = useState(
        {
            name: '',
            id: 0,
            address: '',
            lat: 0,
            lng: 0,
          }
    );
    const [listingMarker, setListingMarker] = useState(
        {
            name: '',
            id: 0,
            address: '',
            lat: 0,
            lng: 0,
          }
    );
    const [distance, setDistance] = useState(0);

    Geocode.fromAddress(props.user.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setUserMarker({
              name: 'User',
              id: 1,
              address: props.user.address,
              lat: lat,
              lng: lng,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  
      //change this later to depend on whether listing is of type delivery or service
      Geocode.fromAddress(props.listing.location).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setListingMarker({
              name: 'Listing',
              id: 2,
              address: props.listing.location,
              lat: lat,
              lng: lng,
          });
        },
        (error) => {
          console.log(error);
        }
      );

      var distanceCalc = () => {
        // Calculates distance between two places based on their longitude and latitude
        var R = 3958.8; // Earth's radius in miles
        var distanceLat = rad(
          userMarker.lat - listingMarker.lat
        );
        var distanceLong = rad(
          userMarker.lng - listingMarker.lng
        );
        var a =
          Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
          Math.cos(rad(listingMarker.lat)) *
            Math.cos(rad(userMarker.lat)) *
            Math.sin(distanceLong / 2) *
            Math.sin(distanceLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in miles
        setDistance(d);
      };
    
    return(
        <div>          
            <h1>this is the distance: {distance}</h1>
         </div>);
};

export default ListingDistance;