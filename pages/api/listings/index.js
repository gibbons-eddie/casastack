import dbConnect from '../../../utils/dbConnect';
import Listing from '../../../models/Listing';

dbConnect();

export default async (req, res) => {
    const { method, json } = req;

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
                console.log('in the api')
                console.log(json)
                //const listing = await Listing.create(json);
                /*await new Listing({
                    service: json.service,
                    status: json.status,
                    location: json.location,
                    description: json.description,
                    acceptor: json.acceptor,
                    owner: json.owner,
                    ownerAddress: json.ownerAddress,
                    locationCoords: json.locationCoords,
                    ownerCoords: json.ownerCoords,
                }).save()*/

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