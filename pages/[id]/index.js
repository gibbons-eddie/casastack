import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

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
        <div className="listing-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{listing.service}</h1>
                    <p>{listing.status}</p>
                    <p>{listing.location}</p>
                    <p>{listing.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
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