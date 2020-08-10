import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import newListingStyle from '../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import baseURL from '../utils/baseURL';
import Geocode from 'react-geocode';
import axios from 'axios';

  
Geocode.setApiKey(process.env.MAPS_API_KEY);


const NewListing = ({ user }) => {

  const listingOptions = [
    { key: 'd', text: 'Delivery', value: 'delivery' },
    { key: 's', text: 'Service', value: 'service' },
  ];

  // set status=open by default
  const setDefaultState = (x) => {
    return x;
  };
  const defaultState = {
    service: '',
    status: 'open', // status of listing is open by default
    location: '',
    description: '',
    price: '',
    owner: '',
    acceptor: '',
    ownerAddress: '',
    locationLat: 0,
    locationLng: 0,
    ownerLat: 0,
    ownerLng: 0,
  };
  const [form, setForm] = useState(setDefaultState(defaultState));
  // To hide store location address field if the listing type is "service"
  const [seeLocationInput, setSeeLocationInput] = useState(true);

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
            json.ownerLat = response.results[0].geometry.location.lat;
            json.ownerLng = response.results[0].geometry.location.lng;
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
            json.locationLat = response.results[0].geometry.location.lat;
            json.locationLng = response.results[0].geometry.location.lng;
          },
          (error) => {
            console.log(error);
          }
        );
      }
      console.log(json);
      /*const res = await fetch(`${baseURL}/api/listings`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(...json),
      });*/
      const url = `${baseURL}/api/postlistingAPI`;
      const payload = json;
      await axios.post(url,payload);
      router.push('/joblisting');
    } catch (error) {
      console.log(error);
    }
  };

  const getPrice = () => {
    if (form.description != '')
    {
      form.price = form.description.match(/\d+/g).map(Number);
    }
  }

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
  const handleStoreStatus = (event, result) => {
    // for selecting listing type in dropdown
    const { name, value } = result;
    setForm({ ...form, [name]: value });

    // set state for store location input field. hide if listing is a service
    value == 'service' ? setSeeLocationInput(false) : setSeeLocationInput(true);
  };

  const validate = () => {
    let err = {};
    if (!form.service) {
      err.service = 'Listing type is required';
    }
    if (!form.status) {
      err.status = 'Status is required';
    }
    if (!form.location && seeLocationInput) {
      err.location = 'Location is required';
    }
    if (!form.description) {
      err.description = 'Description is required';
    }
    if (!form.price) {
      err.price = 'Estimate is required';
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
            <Form.Dropdown
              fluid
              error={
                errors.service
                  ? { content: 'Please select a service', pointing: 'below' }
                  : null
              }
              options={listingOptions}
              placeholder='type'
              label='Select a type of listing'
              name='service'
              onChange={handleStoreStatus}
              selection
            />
            {seeLocationInput ? (
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
            ) : null}

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
            <Form.Input inline
              label='Estimated price: $'
              placeholder='0.00'
              name='price'
              error={
                errors.price
                  ? { content: 'Please enter an estimated price', pointing: 'below' }
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
