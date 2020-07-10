import { Button, Form, Segment, Container} from 'semantic-ui-react';
import React, {useState} from 'react';
import ViewListings from './viewListings';
import CreateListings from './CreateLisintgs'

function myfunction(){
    console.log("hi");
};
const JobListing = (props) =>
{
    const [listings,setListings] = useState(false); 
    const updateListings = () => {
        setListings(!listings);
    };

    const [displayForm,setDisplayForm] = useState(false);
    const updateDisplayForm = () => {
        setDisplayForm(!displayForm);
    };

return (
    <div className="column1">
        <h1>This is the hub for all things job listing related! k3c2</h1>
        <CreateListings
            displayForm={displayForm}
            updateDisplayForm={updateDisplayForm}
            />
                <Container textAlign='center'>
                    <Button type="submit" circular size='big' color='violet'>
                        create job listings
                    </Button>
                </Container>
        <div className="column2">
            <ViewListings 
            listings={listings}
            updateListings={updateListings}
            />
        </div>
    </div>
);
};

export default JobListing;