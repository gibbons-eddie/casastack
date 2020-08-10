const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  service: {
    type: String, // listing type
    required: true,
  },
  status: {
    type: String, // open, closed
    required: true,
  },
  location: {
    type: String, // store location, only for deliveries
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
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

  locationLat: {
    type: Number,
  },
  locationLng: {
    type: Number,
  },
  ownerLat: {
    type: Number,
  },
  ownerLng: {
    type: Number,
  },

}, {
  timestamps: true
})

module.exports = mongoose.models.Listing || mongoose.model('Listing', listingSchema);
