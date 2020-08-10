import mongoose from 'mongoose'

const  { String } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
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
    jobsCompleted: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "volunteer", "admin", "root"]
    }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model("User", userSchema)
