import dbConnect from '../../utils/dbConnect';
import Listing from '../../models/Listing';
import mongoose from 'mongoose';

//const request = require('request'); // http client
var rp = require('request-promise'); // http client with Promise support

dbConnect();

export default async (req, res) => {
  const {
    method,
    service,
    status,
    location,
    description,
    price,
    acceptor,
    owner,
    ownerAddress,
    // locationLat,
    // locationLng,
    ownerLat,
    ownerLng,
  } = req.body;

  //Api request only for deliveries. Since services don't have store addresses when they are made
  if (service === 'delivery') {
    var locationLat = 0;
    var locationLng = 0;

    // call geocode api here
    var BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var address = location;

    var url = BASE_URL + address + '&key=' + process.env.GEOCODE_SERVICE_KEY;
    console.log('this is the url to pass into api request: ', url);

    // No need to make geocode api request to get owner coordinates because on signup the user's coordinates are saved

    // Get coordinates from location (store location)
    var geocodeResult = await rp(url, function (error, response, body) {
      if (response.statusCode == 200 && !error) {
        // Parse the response
        var data = JSON.parse(body);
        locationLat = data.results[0].geometry.location.lat;
        locationLng = data.results[0].geometry.location.lng;
        console.log(
          'Inside gecode api callback, printing coordinates: ',
          data.results[0].geometry.location
        );
        // Upload new listing to mongo here, when coordiantes are ready
        // move try statement here??
      } else {
        console.error('error in geocode: ', error);
        console.error('logging geocode body: ', body);
      }
    });
  }

  try {
    //const listing = await Listing.create(json);
    const newListing = await new Listing({
      service: service,
      status: status,
      location: location,
      description: description,
      acceptor: acceptor,
      owner: owner,
      ownerAddress: ownerAddress,
      locationLat: locationLat,
      locationLng: locationLng,
      ownerLat: ownerLat,
      ownerLng: ownerLng,
      price: price,
    }).save();

    console.log('saved new listing to mongo!');
    res.status(201).json({ success: true, data: newListing });
  } catch (error) {
    res.status(400).json({ success: false });
  }
  //   async function addListing(lat, lng) {

  //   }
};
