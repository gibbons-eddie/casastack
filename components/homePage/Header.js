/* 

CSS

const headerStyle = {
    backgroundColor: "purple",
    color: "white",
    width: "100%",
    height: "50px"
}; 
*/

const Header = () => (
    <div className="Header">
        Header
        <style jsx>
        {`
            background-color: purple;
            color: white;
            width: 100%;
            height: 50p;
        `}
        </style>
    </div>
);

export default Header;