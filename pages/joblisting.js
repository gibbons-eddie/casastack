import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const joblistings1 = ({ listings }) => {
    return(
        <div>
            <nav className="navbar">
        <Link href="/new">
            <a className="create">Create Listing</a>
        </Link>
    </nav>
        <div>
            {listings.map(listing => {
                return (
                    <div key={listing._id}>
                        <Card>
                            <Card.Content>
                                <Card.Header>

                                    <Link href={`/${listing._id}`}>
                                        <a>{listing.service}</a>
                                    </Link>
                                    
                                </Card.Header>
                            </Card.Content>

                            <Card.Content extra>

                                <Link href={`/${listing._id}`}>
                                    <Button primary>
                                        View Listing
                                    </Button>
                                </Link>

                                <Link href={`/${listing._id}/edit`}>
                                    <Button primary>
                                        Edit Listing
                                    </Button>
                                </Link>

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