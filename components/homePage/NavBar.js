/*

CSS

const navBarStyle = {
    backgroundColor: "pink",
    color: "white",
    width: "100%",
    height: "60px"
};
*/
import Link from 'next/link'
import navStyles from './homePageStyles/NavBar.module.css'

const NavBar = () => (
    <div className={navStyles.NavBar}>
        Navigation Bar

            <Link href="/">home</Link>
                
            <Link href="/login">login</Link>

            <Link href="/cart">cart</Link>
                
            <Link href="/profile">profile</Link>
                
            <Link href="/signup">signup</Link>
        
    </div>
);
  
export default NavBar;