import { Segment, Label, Header, Icon, Button } from "semantic-ui-react";
import Link from 'next/link';
import accountPageStyles from '../accountPage/accountPageStyles/accountPage.module.css';

function AccountInfo ({role, firstName, lastName, email, phoneNumber, address, createdAt}) { // call individual elements of user to use them for all kinds of things !
    const isRoot = role === 'root';
    const isAdmin = role === 'admin';
    const isVolunteer = role === 'volunteer';
    const isCustomer = isRoot || isAdmin || isVolunteer;

    return (
        <div className={accountPageStyles.accountForm}>
            <Segment secondary inverted color ='blue'>
                <Label
                size='large'
                ribbon
                icon="privacy"
                style={{ textTransform: 'capitalize', fontFamily: 'Montserrat' }}
                content={role}
                />

                <Header inverted textAlign="center" as="h1" icon style={{ fontFamily: 'Montserrat' }}>
                    <Icon name="user"/>
                    {firstName}
                    <Header.Subheader style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{lastName}</Header.Subheader>
                    <Header.Subheader>{email}</Header.Subheader>
                    <Header.Subheader>{phoneNumber}</Header.Subheader>
                    <Header.Subheader>{address}</Header.Subheader>
                    <Header.Subheader>Joined {createdAt}</Header.Subheader>
                </Header>
            </Segment>

            {!isCustomer && (<Link href="/new">
                    <Button circular size='big' color='twitter' type='submit' style={{fontFamily: 'Montserrat', fontWeight: '350'}}
                        content='Create Listing'
                    />
            </Link>)}
        </div>
    );
}


export default AccountInfo;