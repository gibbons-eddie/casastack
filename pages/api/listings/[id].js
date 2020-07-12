import dbConnect from '../../../utils/dbConnect';
import Listing from '../../../models/Listing';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    

    switch(method){
        case 'GET':
            try {
                const listing = await Listing.findById(id);
                if(!listing){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: listing});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            try {
                const listing = await Listing.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!listing){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: listing});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedListing = await Listing.deleteOne({ _id: id });

                if(!deletedListing){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: {} });

            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}