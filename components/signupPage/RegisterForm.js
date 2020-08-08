import React from 'react'
import { Button, Form, Segment, Container, Message } from 'semantic-ui-react';
import registerFormStyle from './signUpStyles/RegisterForm.module.css'
import errorCatcher from '../../utils/errorCatcher';
import axios from 'axios';
import { handleLogin } from '../../utils/auth'
import baseURL from '../../utils/baseURL';
import Geocode from 'react-geocode';

  
Geocode.setApiKey(process.env.MAPS_API_KEY);

const initializeUser = {
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    coords: {lng:"", lat:""}
}

function Register()
{
    const userOptions = [
        { key: 'c', text: 'No', value: 'user' },
        { key: 'v', text: 'Yes', value: 'volunteer' }
    ];
    
    const [newUser, setNewUser] = React.useState(initializeUser);
    const [disableButton, setDisableButton] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    function handleChange(event) {
        const {name, value} = event.target; // getting the name and its text value for each form input
        setNewUser(prevState => ({...prevState, [name]: value})); // updating the state of each property/name
        // console.log(newUser);
    }

    const handleStatus = (event, result) => { // specifically for the role input
        const {name, value} = result;
        setNewUser({...newUser, [name]: value});
    }

    React.useEffect(() => {
        const isUser = Object.values(newUser).every(element => Boolean(element)); // Object.values(user) returns array of all vars in object 'newUser'
        isUser ? setDisableButton(false) : setDisableButton(true);
    }, [newUser]) // disables signup button if not all fields are completed; whenever "newUser" changes we want to call this function


    async function handleSubmit(event) { // to help display errors that any user can understand (using errorCatcher in utils folder)
        event.preventDefault()

        try {
            setLoading(true);
            setError('');
            // console.log(user) // testing to see if array passes throught (it does !)
            /* USER TO DATABASE */
            var json = newUser;
            await Geocode.fromAddress(newUser.address).then(
                (response) => {
                  json.coords.lat = response.results[0].geometry.location.lat;
                  json.coords.lng = response.results[0].geometry.location.lng;
                },
                (error) => {
                  console.log(error);
                }
              );
              console.log(json);
            const url = `${baseURL}/api/signupAPI`;
            const payload = json; // all data in 'user'
            const response = await axios.post(url, payload); // axios doing all the work
            handleLogin(response.data); // token and cookie initialization
        } catch (error) {
            errorCatcher(error, setError)
        } finally {
            setLoading(false)
        }
    }

    return ( 
    <div className={registerFormStyle.RegisterForm}>
        <h1>Create your CasaStack account</h1>
        <Segment>
            <Form error={Boolean(error)} loading={loading} size='large' onSubmit={handleSubmit}>
                <Message error header="Whoops!" content={error}/>
                
                <Form.Dropdown
                    fluid
                    label='I am signing up to be a volunteer.'
                    options={userOptions}
                    placeholder='Choose Yes or No'
                    onChange={handleStatus}
                    name="role"
                    value={newUser.role}
                    selection
                />
                
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    label="First name"
                    placeholder='First name'
                    
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='address card'
                    iconPosition='left'
                    label="Last name"
                    placeholder='Last name'
                    
                    name="lastName"
                    value={newUser.lastName}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='envelope'
                    iconPosition='left'
                    label="Email"
                    type="email"
                    placeholder='Email'
                    
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    placeholder='Password'
                    
                    name='password'
                    value={newUser.password}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='bed'
                    iconPosition='left'
                    label="Address"
                    placeholder='Address'
                    
                    name="address"
                    value={newUser.address}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='phone'
                    iconPosition='left'
                    label="Phone number"
                    placeholder='Phone number'
                    
                    name="phoneNumber"
                    value={newUser.phoneNumber}
                    onChange={handleChange}
                />
            
                <Container textAlign='center'>
                    <Button disabled={disableButton || loading} type="submit" circular size='big' color='violet'>
                        Sign Up
                    </Button>
                </Container>
            </Form>
        </Segment>

        
    </div>
    );
}

export default Register;
