import User from '../../models/userModel'
import jwt from 'jsonwebtoken'
import dbConnect from '../../utils/dbConnect'

dbConnect();

export default async (req, res) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const { userID } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET); // using our JWT secret password, we verify the user's token
        const user = await User.findOne({ _id: userID });
        if (user) {
            console.log(user);
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(403).send("Invalid token");
    }
}