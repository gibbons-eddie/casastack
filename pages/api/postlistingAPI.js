import dbConnect from '../../utils/dbConnect';
import Listing from '../../models/Listing';
import mongoose from 'mongoose';

dbConnect();

export default async (req, res) => {
    const { method, service, status, location, description, price, acceptor, owner, ownerAddress, locationLat, locationLng, ownerLat, ownerLng } = req.body;

            try {
                //const listing = await Listing.create(json);
                const newListing = await new Listing({
                    service: service,
                    status: status,
                    location: location,
                    description: description,
                    acceptor: acceptor,
                    owner: owner,
                    ownerAddress: ownerAddress,
                    locationLat: locationLat,
                    locationLng: locationLng,
                    ownerLat: ownerLat,
                    ownerLng: ownerLng,
                    price: price
                }).save()

                res.status(201).json({ success: true, data: newListing})

            } catch (error) {

                res.status(400).json({ success: false });
            }
}