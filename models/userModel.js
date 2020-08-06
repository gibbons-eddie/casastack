/*
 * This file creates a base user type using mongoose discriminators (basically
 * object inheritance) that other user types can inherit from. For example, the
 * volunteer user type inherits from the base user, but also has the
 * `jobsCompleted` parameter added to it.
 */
import mongoose, { Schema } from 'mongoose'

const { String } = mongoose.Schema.Types

const baseOptions = {
  discriminatorKey: 'userType',
};

// Base user type with options passed in from 'baseOptions' const
const baseUser = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // email has to be unique to find its user
  },
  password: {
    type: String,
    required: true,
    select: false // so password can't be sent back to the client ever
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "volunteer", "admin", "root"]
  },
  baseOptions,
});

const volunteerSchema = new Schema({
  jobsCompleted: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('user', userSchema);
module.exports = User.discriminator('volunteer', volunteerSchema);

// export default mongoose.models.User || mongoose.model("User", userSchema)
