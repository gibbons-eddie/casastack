function errorCatcher(error, displayError) {
    let errorMessage;

    if (error.response) // if server response exists, but the response code was not in the range of 2XX
    {
        errorMessage = error.response.data;
        console.log("Error response", errorMessage)
    }
    else if (error.request) { // no server response
        errorMessage = error.request;
        console.log("Error request", errorMessage)
    } else { // something else caused an error
        errorMessage = error.message;
        console.log("Error message", errorMessage)
    }
    displayError(errorMessage);
}

export default errorCatcher;