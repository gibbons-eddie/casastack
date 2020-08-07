import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Segment} from 'semantic-ui-react';
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
        <Segment style={{ minHeight: 1000}} color='violet'>
        <div className="grid wrapper">

            {listings.map(listing => {
                return (
                    <div key={listing._id}>
                        <Card style={{ minHeight: 350, maxHeight: 350, width:"300px" }}>
                            <Card.Content>
                                <Card.Header>

                                     <Link href={`/${listing._id}`}>
                                        <>
                                        <h1 style={{textAlign: "center"}} >{listing.service}</h1>
                                        <h5 style={{color:"grey"}}>Description:
                                        <br></br>
                                        {listing.description}</h5>
                                        </>
                                    </Link>
                                    
                                </Card.Header>
                            </Card.Content>

                            <Card.Content extra>
                                    <div style={{textAlign: "center"}}>
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
        </Segment>
        </div>
    )
    
}

joblistings1.getInitialProps = async () => {
    const res = await fetch(`${baseURL}/api/listings`);
    const { data } = await res.json();

    return { listings: data }
}

export default joblistings1;