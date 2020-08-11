require('dotenv').config();

module.exports = {
  env: {
    MONGO_URI:
      process.env.MONGO_URI,
    JWT_SECRET:
      process.env.JWT_SECRET,
    MAPS_API_KEY: process.env.MAPS_API_KEY,
    GEOCODE_SERVICE_KEY: process.env.GEOCODE_SERVICE_KEY,
    STRIPE_KEY: process.env.STRIPE_KEY,
    REACT_CHECKOUT_KEY: process.env.REACT_CHECKOUT_KEY,
  },
};
