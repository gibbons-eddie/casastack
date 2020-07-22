import Head from "next/head";
import Link from 'next/link';
import homeStyles from './homePageStyles/Home.module.css'
import { Sidebar, Icon, Menu } from "semantic-ui-react";

const Layout = ({children, user}) => (
  
  // page overlay, including header and side nav bar
  <div className={homeStyles.Layout}>
    <Head>
      <title>casastack</title>
      <meta charSet="utf-8"/>
    </Head>

    <Sidebar
        as={Menu}
        direction='left'
        icon='labeled'
        inverted
        vertical
        visible
        width="thin"
    >
        
        <Link href="/">
          <Menu.Item as='a'>
            <Icon
              name="home"
            />
            Home
          </Menu.Item>
        </Link>

        <Link href="/login">
          <Menu.Item as='a'>
            <Icon
              name="sign-in alternate"
            />
            Log In
          </Menu.Item>
        </Link>

        <Link href="/joblisting">
          <Menu.Item as='a'>
            <Icon
              name="clipboard"
            />
            Listings
          </Menu.Item>
        </Link>

        <Link href="/profile">
          <Menu.Item as='a'>
            <Icon
              name="id card"
            />
            Profile
          </Menu.Item>
        </Link>

        <Link href="/signup">
          <Menu.Item as='a'>
            <Icon
              name="edit"
            />
            Sign Up
          </Menu.Item>
        </Link>

    </Sidebar>
      
      <Sidebar.Pusher>
      <div className={homeStyles.Content}> 
        <div className={homeStyles.Header}>
          Casastack
        </div>
        {children}
      </div>
      </Sidebar.Pusher>
    
  </div>
);

export default Layout;
