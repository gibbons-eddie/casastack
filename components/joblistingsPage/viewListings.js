import React from 'react';
import { Button, Form, Segment, Container} from 'semantic-ui-react';

const ViewListings = (props) => {
    const listings = "click under here to see listings";
    console.log("hu1");
    if (props.listings) {
        return(<div>
            <h1>{listings}</h1>
            <Button onClick={props.updateListings} type="submit" circular size='big' color='violet'>
                view job listings
            </Button>
            this is where the listings will go (database stuff here)
        </div>);
    }
      else {
        return(<div>
            <h1>{listings}</h1>
            <Button onClick={props.updateListings} type="submit" circular size='big' color='violet'>
                view job listings
            </Button>
        </div>);
    } 
};

export default ViewListings;