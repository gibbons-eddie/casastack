import Layout from "../components/homePage/Layout";;
import AccountProfile from '../components/profilePage/AccountProfile';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Segment } from 'semantic-ui-react';
import listingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';


const Profile = ( {listings} ) => {
    return(
        <div>
            <h1>My Listings</h1>
        <Segment>
            <h1>no listings currently because my schema isnt working</h1>
            {listings.map(listing => {
                return (
                    <div key={listing._id}>
                        <Card centered columnCount="3">
                            <Card.Content>
                                <Card.Header>

                                    <Link href={`/${listing._id}`}>
                                        <h1>{listing.service}</h1>
                                    </Link>
                                    
                                </Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                    <div>
                                        <Button primary size="small">
                                            <Link href={`/${listing._id}`}>
                                                <h3>View Listing</h3>
                                            </Link>
                                        </Button>
                                        <Button primary size="small">
                                            <Link href={`/${listing._id}/edit`}>
                                                <h3>Edit Listing</h3>
                                            </Link>
                                        </Button>
                                    </div>
                                    
                                    
                            

                            </Card.Content>
                        </Card>
                    </div>
                )
            })}
        
            
        </Segment>
        </div>
    )
}


Profile.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/profile');
    const { data } = await res.json();

    return { listings: data }
}


export default Profile;
