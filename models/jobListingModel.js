import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    service: {type: String, required: true},
    status: {type: String, required: true},
    location: {type: String},
    description: {type: String}
    
    
});

export default mongoose.model('listings', listingSchema);