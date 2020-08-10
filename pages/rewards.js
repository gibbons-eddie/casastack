import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Table } from 'semantic-ui-react';
import jobListingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import baseURL from '../utils/baseURL';

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
                            <Card>
                                <Card.Content>
                                    <Card.Header>

                                        <Link href={`/rewardInfo/${rewards._id}`}>
                                            <h1>{rewards.name}</h1>
                                        </Link>

                                        <Link href={`/rewardInfo/${rewards._id}`}>
                                            <h2>{rewards.condition}</h2>
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

            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Rank</Table.HeaderCell>
                        <Table.HeaderCell singleLine>User</Table.HeaderCell>
                        <Table.HeaderCell>Number of Deliveries</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign="center">
                            1
                    </Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                            Eddie Gibson
                    </Table.Cell>
                        <Table.Cell textAlign="right">
                            18
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center">
                            2
                    </Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                            Zayra Azul
                    </Table.Cell>
                        <Table.Cell textAlign="right">
                            14
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center">
                            3
                    </Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                            Seth Lucas
                    </Table.Cell>
                        <Table.Cell textAlign="right">
                            13
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center">
                            4
                    </Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                            Clark Rich
                    </Table.Cell>
                        <Table.Cell textAlign="right">
                            10
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center">
                            5
                    </Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                            Dimitri Vegas
                    </Table.Cell>
                        <Table.Cell textAlign="right">
                            7
                    </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div >
    );
};

rewards1.getInitialProps = async () => {
    const res = await fetch(`${baseURL}/api/rewards`);
    const { data } = await res.json();

    return { rewards: data }
}

export default rewards1;
