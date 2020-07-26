import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form, Segment, Container} from 'semantic-ui-react';


const ViewListing = (props) => {
    if (props.role ==="user") {
        return(<div><Link href={`/profile/user/${props.email}`}>
    <Button circular size='big' color='twitter' type='submit' style={{fontFamily: 'Montserrat', fontWeight: '350'}}
        content='View my Listings'/>
</Link></div>);
    }
    if (props.role === "volunteer") { return(
        <div><Link href={`/profile/volunteer/${props.email}`}>
        <Button circular size='big' color='twitter' type='submit' style={{fontFamily: 'Montserrat', fontWeight: '350'}}
        content='View my Listings'/>
        </Link></div>);
    }   
}

export default ViewListing;