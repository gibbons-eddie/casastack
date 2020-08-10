import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Segment } from 'semantic-ui-react';
import newListingStyle from '../../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import baseURL from '../../../utils/baseURL';


const Reward = ({ reward, user }) => {
    const isRoot = user.role === 'root';
    const isAdmin = user.role === 'admin';
    const isVolunteer = user.role === 'volunteer';

    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteReward();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteReward = async () => {
        const rewardId = router.query.id;
        try {
            const deleted = await fetch(`${baseURL}/api/rewards/${rewardId}`, {
                method: "Delete"
            });

            router.push("/rewards");
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
                    <h1>{reward.name}</h1>
                    <p>{reward.condition}</p>
                    <p>{reward.description}</p>
                    {(isRoot || isAdmin) && (<Button color='red' onClick={open}>Delete</Button>)}
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

Reward.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${baseURL}/api/rewards/${id}`);
    const { data } = await res.json();

    return { reward: data }
}

export default Reward;