import dbConnect from '../../../utils/dbConnect';
import Listing from '../../../models/Listing';

dbConnect();

export default async (req, res) => {
    const {
        query: { email },
        method
    } = req;
    

    switch(method){
        case 'GET':
            try {
                const listing = await Listing.find({owner: email});
                if(!listing){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: listing});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}