import dbConnect from '../../../utils/dbConnect';
import Reward from '../../../models/Reward';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    

    switch(method){
        case 'GET':
            try {
                const reward = await Reward.findById(id);
                if(!reward){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: reward});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            try {
                const reward = await Reward.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!reward){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: reward});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedReward = await Reward.deleteOne({ _id: id });

                if(!deletedReward){
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