const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: int,
    required: true,
  },
  description: {
    type: String,
  },
  acceptor: {
    type: String,
  } 
});

module.exports =
  mongoose.models.Listing || mongoose.model('Reward', rewardSchema);