const baseURL = process.env.NODE_ENV === 'production' ? 'https://casastack.herokuapp.com' : 'http://localhost:3000';
// if in production mode, url path will be set to heroku, else, if in dev mode, localhost:3000

export default baseURL;