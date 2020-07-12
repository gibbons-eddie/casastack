import {
  Button,
  Grid,
  Container,
  Header,
  Form,
  Segment,
  Message
} from 'semantic-ui-react';

import loginFormStyle from './loginPageStyles/LoginForm.module.css';
import errorCatcher from '../../utils/errorCatcher';

const initializeUser = {
  email: "",
  password: "",
}

function LoginForm() {
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
            setLoading(true) // after submit button is pressed, begin loading
            setError('')
            console.log(user) // testing to see if array passes through
        } catch (error) {
            errorCatcher(error, setError) 
        } finally {
            setLoading(false) // end loading
        }
    }
  
  return (
      <div className={loginFormStyle.LoginForm}>
        <h1>Welcome!</h1>
        <Segment textAlign='left'>
          <Form error={Boolean(error)} loading={loading} size='large' onSubmit={handleSubmit}>
          <Message error header="Whoops!" content={error}/>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              label='Email'
              type='email'
              placeholder='Email'
              name='email'

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
            <Container textAlign='center'>
              <Button disabled={disableButton || loading} circular size='big' color='violet' type='submit'>
                Log In
              </Button>
            </Container>
          </Form>
        </Segment>
      </div>
  );
}
export default LoginForm;
