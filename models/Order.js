import mongoose from 'mongoose';

const {ObjectId, Number} = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User"
  },
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

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
