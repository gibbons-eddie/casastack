import Head from 'next/head';
import Link from 'next/link';
import homeStyles from './homePageStyles/Home.module.css';
import { Sidebar, Icon, Menu } from 'semantic-ui-react';
import { handleLogout } from '../../utils/auth';

function Layout({ children, user }) {
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isVolunteer = user && user.role === 'volunteer';
  const isCustomer = isRoot || isAdmin || isVolunteer;

  //const logo = require('../../static/casastack_favicon.png');

  return (
    // page overlay, including header and side nav bar
    <div className={homeStyles.Layout}>
      <Head>
        <title>
          casastack
        </title>
        <meta charSet='utf-8' />
        <link rel="meta icon" href="/casastack_favicon_32_32.png" />
      </Head>

      <Sidebar
        as={Menu}
        direction='left'
        icon='labeled'
        inverted
        vertical
        visible
        width='thin'
        position='fixed'
      >
        <Link href='/'>
          <Menu.Item>
            <Icon name='home' />
            Home
          </Menu.Item>
        </Link>

        {isCustomer && (
          <Link href='/joblisting'>
            <Menu.Item>
              <Icon name='clipboard' />
              Listings
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href='/profile'>
              <Menu.Item>
                <Icon name='id card' />
                Profile
              </Menu.Item>
            </Link>

            <Menu.Item onClick={handleLogout}>
              <Icon name='sign-out alternate' />
              Log Out
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Menu.Item>
                <Icon name='sign-in alternate' />
                Log In
              </Menu.Item>
            </Link>

            <Link href='/signup'>
              <Menu.Item>
                <Icon name='edit' />
                Sign Up
              </Menu.Item>
            </Link>
          </>
        )}
      </Sidebar>

      <Sidebar.Pusher>
        <div className={homeStyles.Content}>
          <div className={homeStyles.Header}>
            CASASTACK
          </div>
          {children}
        </div>
      </Sidebar.Pusher>
    </div>
  );
}

export default Layout;
