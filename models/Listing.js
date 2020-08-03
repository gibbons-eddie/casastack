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
}, {
  timestamps: true
})

module.exports =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);
