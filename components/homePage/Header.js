/* 

CSS

const headerStyle = {
    backgroundColor: "purple",
    color: "white",
    width: "100%",
    height: "50px"
}; 
*/

import headerStyle from './homePageStyles/Header.module.css'

const Header = () => (
    <div className={headerStyle.Header}>
        Casastack
    </div>
);

export default Header;