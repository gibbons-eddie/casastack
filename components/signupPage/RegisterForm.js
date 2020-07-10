import React, { useState } from 'react'
import { Button, Form, Segment, Container, Checkbox } from 'semantic-ui-react';
import registerFormStyle from './signUpStyles/RegisterForm.module.css'
import Link from 'next/link'

const initializeUser = {
    name: "",
    email: "",
    password: "",
    address: "",
    number: ""
}

function Register()
{
    const [user, setUser] = React.useState(initializeUser)
    const [userStatus, setUserStatus] = React.useState(true)

    function handleChange(event) {
        const {name, value} = event.target // getting the name and its text value for each form input
        setUser(prevState => ({...prevState, [name]: value})) // 
    }

    return ( 
    <div className={registerFormStyle.RegisterForm}>
        <h1>Create your CasaStack account</h1>
        <Segment>
            <Form size='large'>
                <Form.Field>
                    <Checkbox label='I am signing up to be a volunteer.' 
                        onChange={() => setUserStatus(!userStatus)}
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
                {userStatus &&
                <Form.Input
                    fluid
                    icon='bed'
                    iconPosition='left'
                    label="Address"
                    placeholder='Address'

                    name="address"
                    value={user.address}
                    onChange={handleChange}
                />}
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
                    <Button type="submit" circular size='big' color='violet'>
                        Sign Up
                    </Button>
                </Container>
            </Form>
        </Segment>

        
    </div>
    );
}

export default Register;
