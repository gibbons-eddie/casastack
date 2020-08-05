const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  service: {
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
    required: true,
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
  email: {
      type: String,
      required: true,
  }
}, {
  timestamps: true
})

module.exports =
  mongoose.models.Order || mongoose.model('Order', orderSchema);
