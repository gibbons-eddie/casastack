import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import newListingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import cookie from 'js-cookie';
import baseURL from '../utils/baseURL';

const NewReward = ({ user }) => {
  const [form, setForm] = useState({
    name: '',
    points: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createReward();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createReward = async () => {
    try {
        var json = form;
      if (true) {
        //if no userToken exists in the cookies then this should return undefined -> false
        //this is whatever they input into the edit form (as a json object)
        //this grabs the (hopefully) logged in user's email through cookies and sets the json's OWNER attribute to that email
        json.owner = user.email;
        // CONSOLE TESTING-----------------------------------------------
        console.log(JSON.stringify(json));
        console.log(json.owner);
        // CONSOLE TESTING-----------------------------------------------

        // Add owner's address to listing object
        json.ownerAddress = user.address;
      }
      const res = await fetch(`${baseURL}/api/rewards`, {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};
    if (!form.name) {
      err.service = 'Name is required';
    }
    if (!form.points) {
      err.status = 'Points are required';
    }
    if (!form.description) {
      err.location = 'Description is required';
    }

    return err;
  };

  return (
    <div className={newListingStyle.newLayout}>
      <h1>Create Reward</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline='centered' />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.name
                  ? { content: 'Please enter a name', pointing: 'below' }
                  : null
              }
              label='Name'
              placeholder='Name'
              name='name'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={
                errors.points
                  ? { content: 'Please enter points', pointing: 'below' }
                  : null
              }
              label='Points'
              placeholder='Points'
              name='points'
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              label='Description'
              placeholder='Description of request'
              name='description'
              error={
                errors.description
                  ? { content: 'Please enter a description', pointing: 'below' }
                  : null
              }
              onChange={handleChange}
            />
            <Button type='submit'>Create</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewReward;
