import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Table, Divider } from 'semantic-ui-react';
import jobListingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css'
import baseURL from '../utils/baseURL';

// const rewardsTable = () => (
// );

const rewards1 = ({ rewards, user }) => {
    const isRoot = user.role === 'root';
    const isAdmin = user.role === 'admin';
    const isVolunteer = user.role === 'volunteer';

    return (

        <div className={jobListingStyle.jobListingsHeader}>

            <div className={jobListingStyle.listingTitle}>
                Rewards
            </div>

            <br></br>
            <br></br>

            <div className="grid wrapper">

                {rewards.map(rewards => {
                    return (
                        <div key={rewards._id}>
                            <Card style={{marginLeft: 20, maxHeight: 400, minHeight: 400}}>
                                <Card.Content>
                                    <Card.Header>

                                        <Link href={`/rewardInfo/${rewards._id}`}>
                                            <h1 style={{maxHeight: 50, minHeight: 50, fontSize: 25}}>{rewards.name}</h1>
                                        </Link>
                                        <Divider section />
                                        <Link href={`/rewardInfo/${rewards._id}`}>
                                            <h2 style={{fontSize: 20}}>{rewards.condition}</h2>
                                        </Link>

                                    </Card.Header>
                                </Card.Content>

                                <Card.Content extra>
                                    <div>
                                        <Button className="card-button" primary size="small">
                                            <Link href={`/rewardInfo/${rewards._id}`}>
                                                <h3>View Reward</h3>
                                            </Link>
                                        </Button>
                                        <br></br>
                                        <br></br>

                                        {(isRoot || isAdmin) && (<Button className="card-button" primary size="small">
                                            <Link href={`/rewardInfo/${rewards._id}/edit`}>
                                                <h3>Edit Reward</h3>
                                            </Link>
                                        </Button>)}
                                    </div>




                                </Card.Content>
                            </Card>
                        </div>
                    );
                })}
            </div>

            
        </div>
    );
};

rewards1.getInitialProps = async () => {
    const res = await fetch(`${baseURL}/api/rewards`);
    const { data } = await res.json();

    return { rewards: data }
}

export default rewards1;
