import Header from "./Header";
import NavBar from "./NavBar";
import Head from 'next/head'

const Layout = (props) => (
  <div className="Layout">
    <Head>
      <title>casastack</title>
      <meta charSet="utf-8"/>
    </Head>

    <Header />
    <div className="Content">
      {props.children}
    </div>
    <NavBar />
    <style jsx global> 
    {`
      * 
      {
        box-sizing: border-box;
      }

      html, body, #__next 
      {
        height: 100%;
        width: 100%;
      }

      body 
      {
        margin: 0;
        padding: 0;
        background-color: white;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Montse", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .Layout 
      {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .Content 
      {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `}
    </style>
  </div>
);

export default Layout;
