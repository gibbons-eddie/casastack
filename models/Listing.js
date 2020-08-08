const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
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
  locationCoords: {
    lat: {type: Number}, lng: {type: Number},
  },
  ownerCoords: {
    lat: {type: Number}, lng: {type: Number},
  },
});

module.exports =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);
