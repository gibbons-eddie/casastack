import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card} from 'semantic-ui-react';
import jobListingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css'
import baseURL from '../utils/baseURL';

const joblistings1 = ({ listings, user }) => {
    const isRoot = user.role === 'root';
    const isAdmin = user.role === 'admin';
    const isVolunteer = user.role === 'volunteer';
    
    return(

        <div className={jobListingStyle.jobListingsHeader}>

            <div className={jobListingStyle.listingTitle}>
            Listings 
            </div>
            
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
                                        <h1>{listing.status}</h1>
                                    </Link>

                                    <Link href={`/${listing._id}`}>
                                        <h2>{listing.service}</h2>
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
                                        {(isRoot || isAdmin) && (<Button className="card-button" primary size="small">
                                            <Link href={`/${listing._id}/edit`}>
                                                <h3>Edit Listing</h3>
                                            </Link>
                                        </Button>)}
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
    const res = await fetch(`${baseURL}/api/listings`);
    const { data } = await res.json();

    return { listings: data }
}

export default joblistings1;