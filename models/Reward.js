const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  } 
});

module.exports =
  mongoose.models.Reward || mongoose.model('Reward', rewardSchema);