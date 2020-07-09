import { Button, Form, Message, Segment } from 'semantic-ui-react';

function Register()
{
    return <>
        <Message
            content="Welcome"
        />
        <Form>
            <Segment>
                <Form.Input
                    label="First Name"
                    placeholder="First Name"
                    name="First Name"
                />
                <Form.Input
                    label="Last Name"
                    placeholder="Last Name"
                    name="Last Name"
                />
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="Email"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="Password"
                />
                <Form.Input
                    label="Address"
                    placeholder="Address"
                    name="Address"
                />
                <Form.Input
                    label="Phone Number"
                    placeholder="Phone Number"
                    name="Phone Number"
                />
            </Segment>
        </Form>
        <Button
            type="submit"
            content="Sign Up"
        />
    </>
}

export default Register;
