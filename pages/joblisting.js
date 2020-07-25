import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card} from 'semantic-ui-react';

const joblistings1 = ({ listings }) => {
    return(

        <div className="listings-container">

            <h1>Listings</h1>    
                <Link href="/new">
                    <Button circular size='big' color='twitter' type='submit' style={{fontFamily: 'Montserrat', fontWeight: '350'}}
                        content='Create Listing'
                    />
                </Link>

                <br></br>
                <br></br>

        <div className="grid wrapper">

            {listings.map(listing => {
                return (
                    <div key={listing._id}>
                        <Card>
                            <Card.Content>
                                <Card.Header>

                                    <Link href={`/${listing._id}`}>
                                        <h1>{listing.service}</h1>
                                    </Link>
                                    
                                </Card.Header>
                            </Card.Content>

                            <Card.Content extra>
                                    <div>
                                        <Button className="card-button" primary size="small">
                                            <Link href={`/${listing._id}`}>
                                                <h3>View Listing</h3>
                                            </Link>
                                        </Button>
                                        <br></br>
                                        <br></br>
                                        <Button className="card-button" primary size="small">
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
        
            
        </div>
        </div>
    )
    
}

joblistings1.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/listings');
    const { data } = await res.json();

    return { listings: data }
}

export default joblistings1;