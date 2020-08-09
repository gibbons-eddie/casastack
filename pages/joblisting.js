import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card} from 'semantic-ui-react';
import jobListingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css'
import baseURL from '../utils/baseURL';
import { useState, useEffect } from 'react';
import Search from '../components/joblistingsPage/Search'

var rad = (x) => {
    return (x * Math.PI) / 180;
  };



const joblistings1 = ({ listings, user }) => {
    const isRoot = user.role === 'root';
    const isAdmin = user.role === 'admin';
    const isVolunteer = user.role === 'volunteer';
    const [filter, setFilter] = useState('100');

    const filterUpdate = (evt) => {
        //Here you can set the filterText property of state to the value passed into this function
        setFilter(evt.target.value);
    };

    const calcDistance = (listing) => {
        // Calculates distance between two places based on their longitude and latitude
      var R = 3958.8; // Earth's radius in miles
      var distanceLat = rad(
        user.lat - listing.locationLat
      );
      var distanceLong = rad(
        user.lng - listing.locationLng
      );
      var a =
        Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
        Math.cos(rad(listing.locationLat)) *
          Math.cos(rad(user.lat)) *
          Math.sin(distanceLong / 2) *
          Math.sin(distanceLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in miles
      return d;
    }
    const hasCoords = (listing) => {
        if (listing.locationLat && listing.locationLng) {return true;}
        return false;
    }
    
    return(
        <div className={jobListingStyle.jobListingsHeader}>

            <div className={jobListingStyle.listingTitle}>
            Listings 
            </div>
                <br></br>
                <br></br>
                <Search onFilterChange ={filterUpdate}></Search>
        <div className="grid wrapper">

            {listings.map(listing => {
                return (
                    <div key={listing._id}>{(hasCoords(listing) && (calcDistance(listing) <filter)) && (
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
                                        {(hasCoords(listing)) && (<h1>{Math.round(calcDistance(listing)*100)/100} miles!</h1>)}
                                    </div>
                            </Card.Content>
                        </Card>
                    )}
                        
                    </div>)
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