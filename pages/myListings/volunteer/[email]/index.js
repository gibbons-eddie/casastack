import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Segment } from 'semantic-ui-react';

const Test1 = ({user, listings}) => {

    console.log(listings);
    return(
        <div>
            <h1> {user.firstName}'s Listings</h1>    
        <Segment>
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
    const res = await fetch(`http://localhost:3000/api/myListingsVolunteer/${email}`);
    const { data } = await res.json();

    return { listings: data }
}

export default Test1;