import Header from "./Header";
import NavBar from "./NavBar";
import Head from "next/head";

import homeStyles from './homePageStyles/Home.module.css'

const Layout = (props) => (
  <div className={homeStyles.Layout}>

    <Head>
      <title>casastack</title>
      <meta charSet="utf-8"/>
    </Head>

    <Header />
    <div className={homeStyles.Content}>
      {props.children}

    </div>
    <NavBar />
  </div>
);

export default Layout;
