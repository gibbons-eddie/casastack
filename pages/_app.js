import 'semantic-ui-css/semantic.min.css';
import '../styles.css';
import 'typeface-montserrat';
import App from 'next/app';
import Layout from '../components/homePage/Layout';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import axios from 'axios';
import baseURL from '../utils/baseURL';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {token} = parseCookies(ctx); 
    
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) { // if a user isnt logged in, they cant see their profile or view listings
      const isProtectedRoute = ctx.pathname === '/profile' || ctx.pathname === '/joblisting';
      if (isProtectedRoute) {
        redirectUser(ctx, '/login');
      }
     } else {
       try {
          const payload = { headers: { Authorization: token } }; // with a token provided, we need to make a GET request with an authorization header
          const url = `${baseURL}/api/accountAPI`;
          const response = await axios.get(url, payload);
          const user = response.data;
          
          const isRoot = user.role === 'root';
          const isAdmin = user.role === 'admin';
          const isVolunteer = user.role === 'volunteer';
          // if token is valid and is a user/customer, they shouldn't be allowed to view job listings page
          const isNotAllowed = !(isRoot || isAdmin || isVolunteer) && ctx.pathname === '/joblisting';
          if (isNotAllowed) {
            redirectUser(ctx, '/');
          }

          pageProps.user = user;
       } catch (error) {
          console.log("Error getting current user", error);
          // throw out invalid token, and redirect to login, works ! :)
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

export default MyApp;