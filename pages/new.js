import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import newListingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import baseURL from '../utils/baseURL';
import Geocode from 'react-geocode';

  
Geocode.setApiKey(process.env.MAPS_API_KEY);

const NewListing = ({ user }) => {
  const [form, setForm] = useState({
    service: '',
    status: '',
    location: '',
    description: '',
    owner: '',
    acceptor: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [destination, setDestination] = useState();
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createList();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createList = async () => {
    try {
      var json = form;
      if (true) {
        json.owner = user.email;
        // Add owner's address to listing object
        json.ownerAddress = user.address;
      }
      if (true) {
        await Geocode.fromAddress(user.address).then(
          (response) => {
            json.ownerCoords = {lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng};
          },
          (error) => {
            console.log(error);
          }
        );
      }
      console.log(json);
      if (true) {
        await Geocode.fromAddress(json.location).then(
          (response) => {
            json.locationCoords = {lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng}
          },
          (error) => {
            console.log(error);
          }
        );
      }
      const res = await fetch(`${baseURL}/api/listings`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });
      router.push('/joblisting');
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
    if (!form.service) {
      err.service = 'Service is required';
    }
    if (!form.status) {
      err.status = 'Status is required';
    }
    if (!form.location) {
      err.location = 'Location is required';
    }
    if (!form.description) {
      err.description = 'Description is required';
    }

    return err;
  };


  return (
    <div className={newListingStyle.newLayout}>
      <h1>Create Listing</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline='centered' />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.service
                  ? { content: 'Please enter a service', pointing: 'below' }
                  : null
              }
              label='Service'
              placeholder='Service'
              name='service'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={
                errors.status
                  ? { content: 'Please enter a status', pointing: 'below' }
                  : null
              }
              label='Status'
              placeholder='Status'
              name='status'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={
                errors.location
                  ? { content: 'Please enter a location', pointing: 'below' }
                  : null
              }
              label='Location'
              placeholder='Store Name'
              name='location'
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

export default NewListing;
