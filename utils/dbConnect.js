import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if(connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    if(connection.isConnected){
        console.log('Connected to Database!');
    }
    else{
        console.log('Error: Could not connect to Database.');
    }
}

export default dbConnect;