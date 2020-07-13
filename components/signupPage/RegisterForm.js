import React, { useState, useEffect } from 'react'
import { Button, Form, Segment, Container, Checkbox, Message } from 'semantic-ui-react';
import registerFormStyle from './signUpStyles/RegisterForm.module.css'
import Link from 'next/link'
import errorCatcher from '../../utils/errorCatcher';
import axios from 'axios';
import handleLogin from '../../utils/auth'

const initializeUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: ""
}

function Register()
{
    const [user, setUser] = React.useState(initializeUser);
    const [disableButton, setDisableButton] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('')

    React.useEffect(() => {
        const isUser = Object.values(user).every(element => Boolean(element)); // Object.values(user) returns array of all vars in object 'user'
        isUser ? setDisableButton(false) : setDisableButton(true);
    }, [user]) // disables signup button if not all fields are completed; whenever "user" changes we want to call this function

    function handleChange(event) {
        const {name, value} = event.target; // getting the name and its text value for each form input
        setUser(prevState => ({...prevState, [name]: value})); // updating the state of each property/name
    }

    async function handleSubmit(event) { // to help display errors that any user can understand (using errorCatcher in utils folder)
        event.preventDefault()

        try {
            setLoading(true)
            setError('')
            //console.log(user) // testing to see if array passes throught (it does !)

            /* USER TO DATABASE */
            const url = `http://localhost:3000/api/signupAPI`;
            const payload = {...user}; // all data in 'user'
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
                <Form.Field>
                    <Checkbox label='I am signing up to be a volunteer.' 
                        onChange={() => volunteerStatus(!customerStatus)}
                    />
                </Form.Field>
                
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    label="First name"
                    placeholder='First name'
                    
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='address card'
                    iconPosition='left'
                    label="Last name"
                    placeholder='Last name'
                    
                    name="lastName"
                    value={user.lastName}
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
                    value={user.email}
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
                    value={user.password}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='bed'
                    iconPosition='left'
                    label="Address"
                    placeholder='Address'
                    
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon='phone'
                    iconPosition='left'
                    label="Phone number"
                    placeholder='Phone number'
                    
                    name="phoneNumber"
                    value={user.phoneNumber}
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
