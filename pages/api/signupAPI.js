import dbConnect from '../../utils/dbConnect'
import User from '../../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

dbConnect();

export default async (req, res) => {
    const { role, firstName, lastName, email, password, address, phoneNumber } = req.body;
    try {
        // validate name, email, and password
        if (!isLength(firstName, {min: 3, max: 10}))
        {
            return res.status(422).send("First name must be between 3-10 characters long")
        } else if (!isLength(firstName, {min: 3, max: 10}))
        {
            return res.status(422).send("Last name must be between 3-10 characters long")
        } else if (!isLength(password, {min: 6})) {
            return res.status(422).send("Password must be at least 6 characters long")
        } else if (!isEmail(email)) {
            return res.status(422).send("Invalid email")
        }
        // check for user in database
        const user = await User.findOne({email});
        if (user) {
            return res.status(422).send(`User already has an account linked to the email address ${email}!`)
        }
        // new user? hash password
        const passHash = await bcrypt.hash(password, 10)
        // submit and create user
        const newUser = await new User({
            role,
            firstName,
            lastName,
            email,
            password: passHash,
            address,
            phoneNumber
        }).save()
        console.log({newUser});
        // create token for the new user, links token to user
        const token = jwt.sign(
                { userID: newUser._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' })
        // respond with token
        res.status(201).json({ token })
    } catch (error) {
        console.error(error)
        res.status(500).send("Sign up error occurred. Please try again later.")
    }
}