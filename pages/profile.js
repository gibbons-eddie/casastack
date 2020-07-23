import AccountInfo from '../components/accountPage/AccountInfo'

function Profile({user}) { // gets user object from pageProps in _app.js, then spreads it out into sub components
    return <>
        <AccountInfo {...user}/> 
    </>;
}
  
export default Profile;