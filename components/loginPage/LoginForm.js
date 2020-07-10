import { Button, Grid, Header, Form, Segment } from 'semantic-ui-react';

function LoginForm() {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 400 }}>
        <div className='container'>
          <Form size='large'>
            <Segment textAlign='left'>
              <Header as='h1' textAlign='center'>
                Welcome
              </Header>
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
              <Button fluid size='large' color='blue' type='submit'>
                Log In
              </Button>
            </Segment>
          </Form>
        </div>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;
