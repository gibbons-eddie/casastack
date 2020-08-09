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
    const [filterDelivery, setFilterDelivery] = useState(true);
    const [filterService, setFilterService] = useState(true);

    const filterUpdate = (evt) => {
        //Here you can set the filterText property of state to the value passed into this function
        if (evt.target.value===''){
            setFilter('100');
        } else {
            setFilter(evt.target.value);
        }
    };

    const deliveryUpdate = () => {
        setFilterDelivery(!filterDelivery);
    }

    const serviceUpdate = () => {
        setFilterService(!filterService);
    }

    const calcDistance = (listing) => {
        // Calculates distance between two places based on their longitude and latitude
        if (listing.service === 'delivery') {
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
      if (listing.service === 'service') {
        var R = 3958.8; // Earth's radius in miles
        var distanceLat = rad(
          user.lat - listing.ownerLat
        );
        var distanceLong = rad(
          user.lng - listing.ownerLng
        );
        var a =
          Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
          Math.cos(rad(listing.ownerLat)) *
            Math.cos(rad(user.lat)) *
            Math.sin(distanceLong / 2) *
            Math.sin(distanceLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in miles
        return d;
      }
    }
    const hasCoords = (listing) => {
        if ((listing.locationLat&& listing.service==='delivery') || listing.service==='service') {return true;}
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
                {filterDelivery ? (<Button onClick={deliveryUpdate}>Hide Services</Button>) : (<Button onClick={deliveryUpdate}>Show Services</Button>)}
                {filterService ? (<Button onClick={serviceUpdate}>Hide Deliveries</Button>) : (<Button onClick={serviceUpdate}>Show Deliveries</Button>)}
        <div className="grid wrapper">

            {listings.map(listing => {
                return (
                    <div key={listing._id}>{(hasCoords(listing) && (calcDistance(listing) <filter)
                        && (filterDelivery || listing.service==='delivery')&& (filterService || listing.service==='service')) && (
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
                                        {(hasCoords(listing)) && ((listing.service==='service') ? <h1>distance to customer is: 
                                        {Math.round(calcDistance(listing)*100)/100} miles!</h1> 
                                        : <h1>distance to store is: {Math.round(calcDistance(listing)*100)/100} miles!</h1>)}
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