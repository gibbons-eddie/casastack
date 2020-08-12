import dbConnect from '../../utils/dbConnect';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

var respromise = require('request-promise'); // http client with Promise support
const fixieRequest = respromise.defaults({ proxy: process.env.FIXIE_URL }); // to route thru fixie

dbConnect();

export default async (req, res) => {
  const {
    role,
    firstName,
    lastName,
    email,
    password,
    address,
    phoneNumber,
  } = req.body;

  // Make geocode api request to get user coordinates
  var userLat = 0;
  var userLng = 0;

  var BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var addr = address;

  var url = BASE_URL + addr + '&key=' + process.env.GEOCODE_API_KEY;
  // Get coordinates from location (store location)
  var geocodeResult = await fixieRequest(url, function (error, response, body) {
    if (response.statusCode == 200 && !error) {
      // Parse the response
      var data = JSON.parse(body);
      userLat = data.results[0].geometry.location.lat;
      userLng = data.results[0].geometry.location.lng;
    } else {
      console.error('error in geocode: ', error);
    }
  });

  try {
    // validate name, email, and password
    if (!isLength(firstName, { min: 3, max: 10 })) {
      return res
        .status(422)
        .send('First name must be between 3-10 characters long');
    } else if (!isLength(firstName, { min: 3, max: 10 })) {
      return res
        .status(422)
        .send('Last name must be between 3-10 characters long');
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send('Password must be at least 6 characters long');
    } else if (!isEmail(email)) {
      return res.status(422).send('Invalid email');
    }
    // check for user in database
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .send(
          `User already has an account linked to the email address ${email}!`
        );
    }
    // new user? hash password
    const passHash = await bcrypt.hash(password, 10);
    // submit and create user
    const newUser = await new User({
      role,
      firstName,
      lastName,
      email,
      password: passHash,
      address,
      phoneNumber,
      jobsCompleted: 0,
      lat: userLat,
      lng: userLng,
    }).save();
    // create token for the new user, links token to user
    const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    // respond with token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send('Sign up error occurred. Please try again later.');
  }
};
