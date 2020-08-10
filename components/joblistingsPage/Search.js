import React from 'react';

const Search = (props) => {
    //You will need to save the value from the textbox and update it as it changes
    //You will need the onChange value for the input tag to capture the textbox value
    return (
        <form>
            <input style={{minWidth:1130, minHeight: 50, fontSize: 20, borderColor: "grey", fontFamily: "Montserrat", borderRadius: 10}} type="text" onChange={props.onFilterChange} placeholder="Type a distance to filter"/>
        </form>
    );

};

export default Search;