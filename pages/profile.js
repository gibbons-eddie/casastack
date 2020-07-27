import AccountInfo from '../components/accountPage/AccountInfo'
import ViewListings from '../components/profilePage/ViewListings'

function Profile({user}) { // gets user object from pageProps in _app.js, then spreads it out into sub components
    return <>
        <AccountInfo {...user}/>
        <ViewListings {...user}/>
    </>;
}
  
export default Profile;