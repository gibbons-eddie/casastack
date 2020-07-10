import { Button, Form, Message, Segment } from 'semantic-ui-react';
import loginFormStyle from './loginPageStyles/LoginForm.module.css';

function LoginForm() {
  return (
    <div className={loginFormStyle.LoginForm}>
      <Message content='Welcome back!' />
      <Form className='inputs' size='large'>
        <Segment>
          <Form.Input
            fluid
            icon='user'
            label='Email'
            placeholder='Email'
            name='Email'
          />
          <Form.Input 
            label='Password' 
            placeholder='Password' 
            name='Password' />
        </Segment>
        <Button size='massive' color='blue'>
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
