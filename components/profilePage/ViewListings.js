import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form, Segment, Container} from 'semantic-ui-react';
import accountButtonStyles from '../accountPage/accountPageStyles/accountPage.module.css'


const ViewListing = (props) => {
    if (props.role ==="user") {
        return(
        <div className={accountButtonStyles.accountButtons}>
            <Link href={`/myListings/user/${props.email}`}>
            <Button circular size='big' color='twitter' type='submit' style={{fontFamily: 'Montserrat', fontWeight: '350'}}
                content='View My Listings'/>
            </Link>
        </div>
            );
    }
    if (props.role === "volunteer") { 
        return(
        <div className={accountButtonStyles.accountButtons}>
            <Link href={`/myListings/volunteer/${props.email}`}>
            <Button circular size='big' color='twitter' type='submit' style={{fontFamily: 'Montserrat', fontWeight: '350'}}
                content='View My Listings'/>
        </Link>
        </div>);
    } 
    return(<div></div>);
}

export default ViewListing;