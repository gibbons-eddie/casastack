import { Button, Form, Message, Segment } from 'semantic-ui-react';

function LoginForm() {
  return (
    <div className='container'>
      <Message content='Welcome back' />
      <Form className='inputs' size='large'>
        <Segment>
          <Form.Input
            fluid
            icon='user'
            label='Email'
            placeholder='Email'
            name='Email'
          />
          <Form.Input label='Password' placeholder='Password' name='Password' />
        </Segment>
        <Button size='massive' color='blue'>
          Log In
        </Button>
      </Form>
      <style jsx>{`
        .container {
          margin: auto;
          background-color: white;
          padding: 10px;
          border-style: ridge;
        }
      `}</style>
    </div>
  );
}

export default LoginForm;
