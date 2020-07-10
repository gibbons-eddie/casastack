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

const NavBar = () => (
    <div className="NavBar">
        Navigation Bar
        <style jsx>
        {`
            background-color: #128212;
            color: white;
            width: 100%;
            height: 60px;
        `}
        </style>
                
            <Link href="/">Home</Link>

            <Link href="/login">Login</Link>

            <Link href="/cart">Cart</Link>
                
            <Link href="/profile">Profile</Link>
                
            <Link href="/signup">Signup</Link>

            <Link href="/listings">Listings</Link>
        
    </div>
);
  
export default NavBar;