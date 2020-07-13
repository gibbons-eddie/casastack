import Link from 'next/link'
import homeStyles from './homePageStyles/Home.module.css'
import { Menu, Container, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'

function NavBar() {

    const customer = false; // for detecting customer user status once logged in 
    const volunteer = false; // for detecting volunteer user status once logged in 
    const router = useRouter();

    function isPathActive(route) // fancy selected appearance
    {
        return route === router.pathname;
    }

    return (

        
        <div className={homeStyles.NavBar}>
                <Link href="/">
                    <Icon
                        name="home"
                        size="large"
                    />
                </Link>
                    
                <Link href="/login">
                    <Icon
                        name="sign-in alternate"
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