import { Button, Form, Message, Segment } from 'semantic-ui-react';
import registerFormStyle from './signUpStyles/RegisterForm.module.css'

function Register()
{
    return ( 
    <div className={registerFormStyle.RegisterForm}>
        <div className={registerFormStyle.formHeader}>
        <Message
            header="Welcome!"
            content=''
        />
        </div>
        <Form>
            <Segment>
                <Form.Input
                    label="First name"
                    name="First Name"
                />
                <Form.Input
                    label="Last name"
                    name="Last Name"
                />
                <Form.Input
                    label="Email"
                    name="Email"
                />
                <Form.Input
                    label="Password"
                    name="Password"
                />
                <Form.Input
                    label="Address"
                    name="Address"
                />
                <Form.Input
                    label="Phone number"
                    name="Phone Number"
                />
            </Segment>
        </Form>
        <Button
            type="submit"
            content="Sign Up"
        />
    </div>
    );
}

export default Register;
