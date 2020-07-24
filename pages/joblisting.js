import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Segment } from 'semantic-ui-react';
import listingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';

const joblistings1 = ({ listings }) => {
    return(
        <div className={listingStyle.listingLayout}>
            <h1>Listings</h1>    
                <Link href="/new">
                    <Button circular size='big' color='twitter' type='submit' style={{fontFamily: 'Montserrat', fontWeight: '350'}}
                        content='Create Listing'
                    />
                </Link>

        <Segment className={listingStyle.listingLayout}>
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

joblistings1.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/listings');
    const { data } = await res.json();

    return { listings: data }
}

export default joblistings1;