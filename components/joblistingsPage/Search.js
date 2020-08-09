import React from 'react';

const Search = (props) => {
    //You will need to save the value from the textbox and update it as it changes
    //You will need the onChange value for the input tag to capture the textbox value
    return (
        <form>
            <input type="text" onChange={props.onFilterChange} placeholder="Type to Filter"/>
        </form>
    );

};

export default Search;