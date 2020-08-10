import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import calculateTotal from '../../utils/calculateTotal';
import Listing from '../../models/Listing';
import Order from '../../models/Order';
import User from '../../models/userModel';

const stripe = Stripe(process.env.STRIPE_KEY);

export default async (req, res) => {
    const { paymentData, _id } = req.body;

    try {
        // verify user id from token
        const {userID} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // check payListing email with user email
        const prevCustomer = await stripe.customers.list({
            email: paymentData.email,
            limit: 1
        })

        const isPrevCustomer = prevCustomer.data.length > 0;
        // if not existing customer, create user with email
        let newCustomer;
        if (!isPrevCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentData.email,
                source: paymentData.id
            })
        }
        const customer = (isPrevCustomer && prevCustomer.data[0].id) || newCustomer.id; // save existing customer's id into 'customer' variable if they already have an account
                                                                                        // else save the new customer's id
        
        const listingInfo = await Listing.findOne({_id: _id});
        console.log(listingInfo) // for security purposes: get price on database is safer getting it on the client side
        const stripeTotal = calculateTotal(listingInfo.price);
        // final charge, send email receipt
        const charge = await stripe.charges.create({
            currency: 'usd',
            amount: stripeTotal,
            receipt_email: paymentData.email,
            customer,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`
        }, {
            idempotencyKey: uuidv4() // for security purposes 2: in order to prevent any potential future accidental charges to the user,
                                     // we assign each charge with a unique string and use it for verification
        })
        // add order to database
        await new Order({
            user: userID,
            service: listingInfo.service,
            location: listingInfo.location,
            description: listingInfo.description,
            price: listingInfo.price,
            acceptor: listingInfo.acceptor,
            ownerAddress: listingInfo.ownerAddress,
            email: paymentData.email
        }).save()
        // add completed listing to volunteer user info
        await User.findOneAndUpdate({email: listingInfo.acceptor}, {$inc: {'jobsCompleted': 1}});
        // send back 200 status code for success
        res.status(200).send('Payment successful!');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error completing payment! Please try again.");
    }
}