import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Segment } from 'semantic-ui-react';
import myListingStyle from '../../../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css'
import baseURL from '../../../../utils/baseURL';

const Test1 = ({user, listings}) => {

    console.log(listings);
    return(
        <div className={myListingStyle.listingsHeader}>
            <div className={myListingStyle.myListingTitle}>{user.firstName}'s Listings</div>    
        <Segment color='violet'>
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

Test1.getInitialProps = async ( {query: {email} } ) => {
    const res = await fetch(`${baseURL}/api/myListingsVolunteer/${email}`);
    const { data } = await res.json();

    return { listings: data }
}

export default Test1;