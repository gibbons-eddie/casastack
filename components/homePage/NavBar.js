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
import { Menu, Container, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'

function NavBar() {

    const user = false; // for detecting user status once logged in (volunteer status WIP)
    const router = useRouter();

    function isPathActive(route) // fancy selected appearance
    {
        return route === router.pathname;
    }

    return (
        
        <div className={navStyles.NavBar}>
                <Link href="/">
                    <Icon
                        name="home"
                        size="large"
                    />
                </Link>
                    
                <Link href="/login">
                    <Icon
                        name="user"
                        size="large"
                    />
                </Link>

                <Link href="/cart">
                    <Icon
                        name="cart"
                        size="large"
                    />
                </Link>
                    
                <Link href="/profile">
                    <Icon
                        name="id card"
                        size="large"
                    />
                </Link>
                    
                <Link href="/signup">
                    <Icon
                        name="edit"
                        size="large"
                    />
                </Link>
        </div>
    )

}
  
export default NavBar;