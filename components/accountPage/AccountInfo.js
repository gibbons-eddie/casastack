import { Segment, Label, Header, Icon } from "semantic-ui-react";
import accountPageStyles from '../accountPage/accountPageStyles/accountPage.module.css';

function AccountInfo ({role, firstName, lastName, email, phoneNumber, address, createdAt}) { // call individuals elements of user and use them !
    //const name = user.firstName + user.lastName;
    
    return (
        //console.log(user.firstName),
        
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
        </div>
    );
}


export default AccountInfo;