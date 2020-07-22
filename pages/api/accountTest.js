//import accounts from '../../static/accounts.json'
import Listing from '../../models/Listing'
import dbConnect from '../../utils/dbConnect'

dbConnect();

export default async (req, res) => {
    const listings = await Listing.find();
    res.status(200).json(listings)
}