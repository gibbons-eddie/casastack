import { Button, Form, Segment, Container } from 'semantic-ui-react';
import registerFormStyle from './signUpStyles/RegisterForm.module.css'

function Register()
{
    return ( 
    <div className={registerFormStyle.RegisterForm}>
        <h1>Create your CasaStack account</h1>
        <Segment>
            <Form size='large'>
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    label="First name"
                    placeholder='First name'
                    name="First Name"
                />
                <Form.Input
                    fluid
                    icon='address card'
                    iconPosition='left'
                    label="Last name"
                    placeholder='Last name'
                    name="Last Name"
                />
                <Form.Input
                    fluid
                    icon='envelope'
                    iconPosition='left'
                    label="Email"
                    placeholder='Email'
                    name="Email"
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    placeholder='Password'
                    name='Password'
                />
                <Form.Input
                    fluid
                    icon='bed'
                    iconPosition='left'
                    label="Address"
                    placeholder='Address'
                    name="Address"
                />
                <Form.Input
                    fluid
                    icon='phone'
                    iconPosition='left'
                    label="Phone number"
                    placeholder='Phone number'
                    name="Phone Number"
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
