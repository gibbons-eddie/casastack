import Header from "./Header";
import NavBar from "./NavBar";
import Head from "next/head";

import layoutStyles from './homePageStyles/Layout.module.css'
import contentStyles from './homePageStyles/Content.module.css'

const Layout = (props) => (
  <div className={layoutStyles.Layout}>
    <Head>
      <title>casastack</title>
      <meta charSet="utf-8"/>
    </Head>

    <Header />
    <div className={contentStyles.Content}>
      {props.children}
    </div>
    <NavBar />
  </div>
);

export default Layout;
