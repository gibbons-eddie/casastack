import AccountInfo from '../components/accountPage/AccountInfo'
import ViewListings from '../components/accountPage/ViewListings'
import OrderHistory from '../components/accountPage/OrderHistory'
import { parseCookies } from 'nookies';
import baseURL from '../utils/baseURL';
import axios from 'axios';

function Profile({user, orders}) { // gets user object from pageProps in _app.js, then spreads it out into sub components
    const isCustomer = user.role === 'user';
    
    return <>
        <AccountInfo {...user}/>
        {isCustomer && (<OrderHistory orders={orders}/>)}
        
    </>;
}

Profile.getInitialProps = async ctx => {
    const {token} = parseCookies(ctx);
    if (!token) { 
        return {order: []};
    }
    const payload = {headers: {Authorization: token}};
    const url = `${baseURL}/api/orderAPI`;
    const response = await axios.get(url, payload);
    return response.data;
}
  
export default Profile;