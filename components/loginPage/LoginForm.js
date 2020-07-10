import {
  Button,
  Grid,
  Container,
  Header,
  Form,
  Segment,
} from 'semantic-ui-react';

function LoginForm() {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 400 }}>
        <Segment textAlign='left'>
          <Form size='large'>
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
            <Container textAlign='center'>
              <Button circular size='big' color='violet' type='submit'>
                Log In
              </Button>
            </Container>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
export default LoginForm;
