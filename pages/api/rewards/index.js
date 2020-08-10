import dbConnect from '../../../utils/dbConnect';
import Reward from '../../../models/Reward';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try{
                const rewards = await Reward.find({});

                res.status(200).json({ success: true, data: rewards })

            } catch (error){

                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const reward = await Reward.create(req.body);

                res.status(201).json({ success: true, data: reward})

            } catch (error) {

                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}