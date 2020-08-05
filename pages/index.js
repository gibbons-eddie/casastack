import React from 'react';
import homepageStyles from '../components/homePage/homePageStyles/Home.module.css';
import Faq from '../components/homePage/faq';

const Home = (props) => (
  <div className={homepageStyles.container}>
    <Faq />
  </div>
);

export default Home;
