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
                
            <Link href="/">home</Link>
                
            <Link href="/login">login</Link>

            <Link href="/cart">cart</Link>
                
            <Link href="/profile">profile</Link>
                
            <Link href="/signup">signup</Link>
        
    </div>
);
  
export default NavBar;