import React from 'react';
import { Form } from 'semantic-ui-react';

const Search = (props) => {
    //You will need to save the value from the textbox and update it as it changes
    //You will need the onChange value for the input tag to capture the textbox value
    return (
        <Form.Input
            type="text" onChange={props.onFilterChange} placeholder="Type a distance to filter!" icon='search'
        />
    );

};

export default Search;