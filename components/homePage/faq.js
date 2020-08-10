import React from 'react';
import { Container, Header, Segment, Divider } from 'semantic-ui-react';

// different things depending on customer or volunteer
function Faq() {
  return (
    <Container>
      <Header size='large' textAlign='center'>
        FAQ
      </Header>
      <Segment floated='left'>
        <Header as='h2'>How do you create a listing?</Header>
        <p>
          To create a listing, users must click on the "Create Listing" tab on the sidebar to the left. On this page, select whether the listing will be a "delivery" or "service". 
          <br/>
          <br/>          
          If "delivery" is selected, users will be asked to type in the address of the store that they wish for their requested items to be purchased from. <strong>Make sure the address is typed in correctly with a city, state, and zip code.</strong> Next, users must enter the specific items, quantity, and the item numbers which can be found on the website of the store being purchased from. <strong>It is important to be as descriptive as possible when entering the item name and quantity so that volunteers making the delivery can find the items requested as fast as possible.</strong> Lastly, enter the estimated price of the purchase so that volunteers know which listings they will be able to accept or not.
          <br/>
          <br/>
          If "service" is selected, users will be asked to describe the service that they need help with. <strong>Again, it is imperative that users be as descriptive as possible so that volunteers can choose listings that they have the skills for.</strong> Volunteers will be directed to the user's address and will complete the service requested.
          <br/>
          <br/>
          All that is left to be done is to click on the "Create Listing" button at the bottom of the page.
        </p>
        <Divider section />

        <Header as='h2'>How can I view a listing I just created?</Header>
        <p>
          All users will be able to view their current open listings through the sidebar to the left. Users must select the "View Current Listings" tab and they will be redirected to a page listing out all of their listings that are open currently. These listings are either accepted or open. Closed listings will be available in the past orders section of the profile page. All of the listings on the "View Current Listings" tab are viewable with specific information of each individual listing.
        </p>
        <Divider section />

        <Header as='h2'>How can I delete a listing as a customer?</Header>
        <p>
          As long as a listing has not been accepted yet by a volunteer, users are able to delete listings that they no longer need. All users need to do is navigate to the "View Current Listings" tab and select to view the listing they wish to delete. Users will be redirected to a page showing the listing's specific information with a button at the bottom allowing for the listing to be closed. This button is labeled "Delete", and users will be asked again to confirm that they wish to delete the current listing.
        </p>
        <Divider section />

        <Header as='h2'>How can I edit a listing?</Header>
        <p>
          Users are allowed to edit a listing in the case that they need to add or remove items from a "delivery". Edits can only be made before the items in the delivery are paid for by the volunteer.
          <br/>
          <br/>
          <strong>To edit a listing, users must:</strong>
          <br/>
          <br/>
            <ol>
              <li>Navigate to the "View Current Listings" tab.</li>
              <li>Select listing to be edited.</li>
              <li>Make corrections or additions to the description of the listing.</li>
              <li>Submit changes with the button below.</li>
            </ol>
        </p>
        <Divider section />

        <Header as='h2'>What happens when my listing is not accepted by any volunteer?</Header>
        <p>
          Listings are open to the volunteers' discretion whether he/she wants to accept it or not. There are many factors that go into why a specific listing has gone unaccepted for long periods of time. To better ensure a listing will be accepted by a volunteer, make sure to be as descriptive as possible when describing the service or items you wish to have delivered. If listings are not described well enough, volunteers will not be able to ensure that they will be able to complete the listing, making it less-likely to be accepted by a willing volunteer.
          <br/>
          <br/>
          <strong>Increase your listing's likelihood to being accepted by doing the following:</strong>
          <br/>
          <br/>
            <ul>
              <li>If a delivery, do not request small, inexpensive items in low quantities. No volunteer wants to travel all the way for one pack of nails.</li>
              <li>Be as descriptive as possible if requesting a service. The volunteer must be able to determine if the job is even in their skill set.</li>
              <li>Choose the nearest store location so that volunteers do not have to drive too far from the store and customer address.</li>
              <li>Do not request a service that is too large or difficult for just one volunteer.</li>
            </ul>
        </p>
        <Divider section />

        <Header as='h2'>How can I drop/complete a listing as a volunteer?</Header>
        <p>
          Volunteers can drop and complete listings all on the same page. Listings may be dropped if volunteers deem that they cannot complete the listing, in which the listing will move back to the listings page for other volunteers to accept. After listings are completed, volunteers may mark listings as complete and remove them from their page of accepted listings. To navigate to the page for dropping or completing a listing, volunteers must go to the "View Current Listings" tab and select to view the listing that they wish to complete or drop. On this page, volunteers will have buttons that say either "Drop" or "Complete" in which they may choose to accordingly.
        </p>
        <Divider section />

        <Header as='h2'>How do rewards work for volunteers?</Header>
        <p>
          The top volunteers of every month are given rewards, which can be found on the "Rewards" tab. Volunteers will be able to see the leaderboard to determine how close they are to receiving a reward. Leaderboards are reset each month so that new volunteers can receive awards too. Volunteers that are selected for rewards are contacted through email and further delivery of rewards will be discussed there.
        </p>
        <Divider section />
      </Segment>
    </Container>
  );
}

export default Faq;
