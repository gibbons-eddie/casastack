import dbConnect from '../../utils/dbConnect';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
    const {email, password} = req.body;
    try {
        // check if user exists with email
        const user = await User.findOne({email}).select('+password') // bypass security needed to check existing password
        // no user found? return error
        if (!user) {
            return res.status(404).send("No user exists with that email")
        }
        // check user password in database
        const match = await bcrypt.compare(password, user.password);
        // it exists? generate a token
        if (match) {
            const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
            // send token to client
            res.status(200).json(token)
            // console.log(user.address);
        } else {
        res.status(401).send("Incorrect password")
        } 
    } catch (error) {
        console.error(error)
        res.status(500).send("Error logging in user. Please try again later.")
    }
}