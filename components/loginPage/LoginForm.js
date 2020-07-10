import {
  Button,
  Grid,
  Container,
  Header,
  Form,
  Segment,
} from 'semantic-ui-react';

import loginFormStyle from './loginPageStyles/LoginForm.module.css'

function LoginForm() {
  return (
      <div className={loginFormStyle.LoginForm}>
        <h1>Welcome!</h1>
        <Segment textAlign='left'>
          <Form size='large'>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              label='Email'
              placeholder='Email'
              name='Email'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              label='Password'
              placeholder='Password'
              name='Password'
            />
            <Container textAlign='center'>
              <Button circular size='big' color='violet' type='submit'>
                Log In
              </Button>
            </Container>
          </Form>
        </Segment>
      </div>
  );
}
export default LoginForm;
