import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Segment } from 'semantic-ui-react';
import newListingStyle from '../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import cookie from 'js-cookie';

const Listing = ({ listing }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteListing();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const openAccept = async () => {
        try {
            //comments so people can understand - by Joseph
            if (cookie.get('userToken')){ //if no userToken exists in the cookies then this should return undefined -> false
                //this is whatever they input into the edit form (as a json object)
                var json = listing; 
                //this grabs the (hopefully) logged in user's email through cookies and sets the json's acceptor attribute to that email
                json.acceptor = (JSON.parse(cookie.get('userToken')).user.email);
                // CONSOLE TESTING-----------------------------------------------
                console.log(JSON.stringify(json));
                console.log(json.acceptor);
                // CONSOLE TESTING-----------------------------------------------
            }
            const res = await fetch(`http://localhost:3000/api/listings/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json)
            })
            router.push("/joblisting");
        } catch (error) {
            console.log(error);
        }
    }

    const deleteListing = async () => {
        const listingId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/listings/${listingId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className={newListingStyle.newLayout}>
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>Service: {listing.service}</h1>
                    <Segment>
                    <p>Job status: {listing.status}</p>
                    <p>Location: {listing.location}</p>
                    <p>Description: {listing.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                    </Segment>
                </>
                
            }
            <Button color='green' onClick={openAccept}>Accept</Button>
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )

}

Listing.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/listings/${id}`);
    const { data } = await res.json();

    return { listing: data }
}

export default Listing;