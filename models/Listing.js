const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  service: {
    type: String, // listing type
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String, // store location, only for deliveries
  },
  description: {
    type: String,
  },
  acceptor: {
    type: String,
  },
  owner: {
    type: String,
  },
  ownerAddress: {
    type: String,
  },
});

module.exports =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);
