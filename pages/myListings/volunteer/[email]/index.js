import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Segment } from 'semantic-ui-react';
import myListingStyle from '../../../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css'
import baseURL from '../../../../utils/baseURL';

const Test1 = ({user, listings}) => {
    // console.log(listings);
    if(!listings.length){
        return(
            <Segment style={{textAlign: "center"}}>

                    <h1>No Listings Accepted</h1>
                   
            </Segment>
            
        )
    }
    else{
        return(
        <div className={myListingStyle.listingsHeader}>
            <div className={myListingStyle.myListingTitle}>{user.firstName}'s Listings</div>    
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
                                        <h1 style={{textAlign: "center", textTransform: 'capitalize'}} >{listing.service}</h1>
                                        <h5 style={{color:"grey", fontSize: 20}}>Description:
                                        <br></br>
                                        {listing.description}</h5>
                                        
                                        </>
                                    </Link>
                                    
                                </Card.Header>
                            </Card.Content>

                            <Card.Content extra>

                                
                                    <div style={{textAlign: "center"}}>
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
            
            })
            }
        
        </div>
        </Segment>
        </div>
    )
        }
}

Test1.getInitialProps = async ( {query: {email} } ) => {
    const res = await fetch(`${baseURL}/api/myListingsVolunteer/${email}`);
    const { data } = await res.json();

    return { listings: data }
}

export default Test1;