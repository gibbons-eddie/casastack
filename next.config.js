require('dotenv').config();

module.exports = {
  env: {
    MONGO_URI:
      'mongodb+srv://user:casastack@casastack.jxrlo.mongodb.net/casastack?retryWrites=true&w=majority',
    JWT_SECRET:
      '9CF3420A3B00BD97E783743E0A83C20B2909D088ADF0EE2A3574AB9E12D0E1F3',
    MAPS_API_KEY: process.env.MAPS_API_KEY,
    STRIPE_KEY:
      'sk_test_51HCSooLmX91vqtCSXxbYu8KCEzLStJgOT2TEN8wDijcGrJr0VKAXH5cFwG7K1N6ScZRx8DltdFihl9HqJc8LHM9V00FRTvpLjR',
  },
};
