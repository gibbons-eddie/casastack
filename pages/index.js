import React from 'react'
import axios from 'axios'

function Home({listings}){
    //console.log(listings);
    /*React.useEffect(() => {
        getAccounts()
    }, [])

    async function getAccounts() { // automagically implements a promise
        const url = 'http://localhost:3000/api/accountTest'
        const response = await axios.get(url); // 
        console.log(response.data);
    }*/

    return <div>Welcome to casastack!</div>
}

Home.getInitialProps = async () => {
    // fetch data from server
    // return response data as an object
    //const url = 'http://localhost:3000/api/accountTest'
    //const response = await axios.get(url);
    //return {listings: response.data}
    //note: this object will be merged with existing props
}

export default Home;
