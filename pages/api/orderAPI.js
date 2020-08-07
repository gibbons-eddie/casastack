import Order from '../../models/Order';
import jwt from 'jsonwebtoken';
import dbConnect from '../../utils/dbConnect';

dbConnect();

export default async (req,res) => {
    try {
        // verify user id from token
        const {userID} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // find user's orders
        const orders = await Order.find({user: userID});
        res.status(200).json({orders});
    } catch (error) {
        console.log(error);
        res.status(403).send('Please try logging in again!');
    }
}