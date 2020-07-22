import 'semantic-ui-css/semantic.min.css';
import '../styles.css';
import 'typeface-montserrat';
import App from 'next/app';
import Layout from '../components/homePage/Layout';
import { parseCookies, destroyCookie } from 'nookies'; // next cookies dependency
import { redirectUser } from '../utils/auth';
import axios from 'axios';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {token} = parseCookies(ctx); 
    
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!token) { // if a user isnt logged in, they cant see their profile or view listings
      const isProtectedRoute = ctx.pathname === '/profile' || ctx.pathname === '/joblisting';
      if (isProtectedRoute) {
        redirectUser(ctx, '/login');
      }
     } else {
       try {
          const payload = { headers: { Authorization: token } }; // with a token provided, we need to make a GET request with an authorization header
          const url = `http://localhost:3000/api/accountAPI`;
          const response = await axios.get(url, payload);
          const user = response.data;
          pageProps.user = user;
       } catch (error) {
          console.log("Error getting current user", error);
          // throw out invalid token, and redirect to login, doesn't work :(
          destroyCookie(ctx, "token");
          redirectUser(ctx, '/login');
       }
    }

    return { pageProps };
  }
  
  render() {
    const { Component, pageProps } = this.props;
    return(
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

// OG //
/*function MyApp({ Component, pageProps }) {
    return <Layout><Component {...pageProps} /></Layout>
  }*/

  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default MyApp;
