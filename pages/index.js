import React from 'react';
import homepageStyles from '../components/homePage/homePageStyles/Home.module.css';
import { Grid, Header } from 'semantic-ui-react';
import Faq from '../components/homePage/faq';

const Home = (props) => (
  <>
    <Header style={{fontFamily: 'Montserrat', fontWeight: '400', fontSize: '100px', marginTop: '65px', textAlign: 'center'}}>
      <img src='/casastack_header.png' />
      CASASTACK
    </Header>

    <div style={{paddingLeft: 200, paddingRight: 200, paddingTop: 0, paddingBottom: 100}}>
    <h5 style={{textAlign: "center", fontSize: "60px", border: "10px solid black", backgroundColor: "#280853", color: "white"}}>Mission Statement</h5>
    <h3>Casastack is a web service designed to eliminate the hassle of having to run back and forth 
      between hardware stores and the site of a project currently being worked on. Users of this site 
      will create requests for volunteers to fulfill, either being a delivery of items or just personal 
      help with a project such as hanging a ceiling fan. Whether you are too old to fix the door 
      you've been needing to fix for a while now or simply just on the job and lack time 
      to run to the hardware store for an item pickup, 
      Casastack is here to ensure you are able to get the help you need done promptly and with care.</h3>
    </div>

    <br/>

    <Header style={{fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif', 
                    fontWeight: '800', fontSize: '70px', textAlign: 'center', color: 'black', borderBottom: "10px solid black",
                    marginLeft: 500, marginRight: 500, marginBottom: 100}}>
        As a customer...
    </Header>
    
    <Grid divided='vertically'>
      <Grid.Row columns={3}>
      
      <div className={homepageStyles.container}>
      <h5 style={{color: '#47108f'}}>
        Create listings
      </h5>
        Whether you require a delivery of various goods from any store or help with moving some furniture around in your home,
        Casastack allows you to create a delivery or service request. Whichever accommodates your needs.
      </div>

      <div className={homepageStyles.container}>
      <h5 style={{color: '#47108f'}}>
        Check status
      </h5>
        Easy status updates let you know when your designated volunteer will arrive, 
        and once payment has been processed and verified, you may close the request.
      </div>

      <div className={homepageStyles.container}>
      <h5 style={{color: '#47108f'}}>
        View orders 
      </h5>
        Your order history is saved as soon as payment has been made, with your volunteer's
        contact information should you need their assistance.
      </div>

      </Grid.Row>
    </Grid>

    <Header style={{fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif', 
                    fontWeight: '800', fontSize: '70px', textAlign: 'center', color: 'black', borderBottom: "10px solid black",
                    marginLeft: 500, marginRight: 500, marginBottom: 100, marginTop: 100}}>
        As a volunteer...
    </Header>
    <Grid divided='vertically' style={{marginBottom: 50}}>
      <Grid.Row columns={3}>
        
      <div className={homepageStyles.container}>
      <h5 style={{color: '#47108f'}}>
        Complete requests
      </h5>
        Whether you require a delivery of various goods from any store or help with moving some furniture around in your home,
        Casastack allows you to create whichever type of listing accommodates your needs.
      </div>

      <div className={homepageStyles.container}>
      <h5 style={{color: '#47108f'}}>
        Earn       
        rewards
      </h5>
        Every month, volunteers can redeem unique rewards based on how many requests they fulfilled, with 
        the leaderboard system providing a competitive environment for all volunteers.
      </div>

      <div className={homepageStyles.container}>
      <h5 style={{color: '#47108f'}}>
        Provide       
        help
      </h5>
        Casastack is dedicated to aid all those who request it and to be a strong helping hand in uncertain times, 
        and these values are reflected onto our staff and volunteer team.
      </div>

      </Grid.Row>
    </Grid>

    <Faq />
  </>
);

export default Home;
