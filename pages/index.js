import React from 'react';
import homepageStyles from '../components/homePage/homePageStyles/Home.module.css';
import { Grid } from 'semantic-ui-react';
import Faq from '../components/homePage/faq';

const Home = (props) => (
  <>
    <h4>
      Welcome to Casastack!
    </h4>
    <h6>
        As a customer...
    </h6>
    <Grid divided='vertically'>
      <Grid.Row columns={2}>
      <div className={homepageStyles.container}>
      <h5>
        Make listings
      </h5>
        Whether you require a delivery of various goods from any store or help with moving some furniture around in your home,
        Casastack allows you to create whichever type of listing accommodates your needs.
      </div>

      <div className={homepageStyles.container}>
      <h5>
        Dynamic editing
      </h5>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </div>

      </Grid.Row>
    </Grid>

    <h6>
        As a volunteer...
    </h6>
    <Grid divided='vertically' style={{marginBottom: 50}}>
      <Grid.Row columns={2}>
      <div className={homepageStyles.container}>
      <h5>
        Make listings
      </h5>
        Whether you require a delivery of various goods from any store or help with moving some furniture around in your home,
        Casastack allows you to create whichever type of listing accommodates your needs.
      </div>

      <div className={homepageStyles.container}>
      <h5>
        Dynamic editing
      </h5>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </div>

      </Grid.Row>
    </Grid>

    <Faq />
  </>
);

export default Home;
