import React from 'react';
import { Button, Form, Segment, Container} from 'semantic-ui-react';

const CreateListings = (props) => {
    return(
        <form>
            <input type="text" onChange={props.codeTextUpdate} placeholder="Insert"/>
            <input type="text" onChange={props.nameUpdate} placeholder="Information"/>
            <input type="text" onChange={props.addTextUpdate} placeholder="About"/>
            <input type="text" onChange={props.longUpdate} placeholder="Your Listing"/>
            <input type="text" onChange={props.latUpdate} placeholder="In These boxes"/>
            <button onClick={props.addListing}>Add Listing</button>
        </form>
    );
};

export default CreateListings;