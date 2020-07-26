import dbConnect from '../../../utils/dbConnect';
import Listing from '../../../models/Listing';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try{
                const listings = await Listing.find({$and: [{status: {$ne: "completed"}}, {status: {$ne: "accepted"}}]});

                res.status(200).json({ success: true, data: listings })

            } catch (error){

                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const listing = await Listing.create(req.body);

                res.status(201).json({ success: true, data: listing})

            } catch (error) {

                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}