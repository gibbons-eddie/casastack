import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import newListingStyle from '../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css'; 
import cookie from 'js-cookie';
import baseURL from '../../utils/baseURL';

const EditListing = ({ listing }) => {
    const [form, setForm] = useState({ service: listing.service, status: listing.status, location: listing.location, description: listing.description });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateListing();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateListing = async () => {
        try {
            var json = form;
            const res = await fetch(`${baseURL}/api/listings/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json)
            })
            router.push("/joblisting");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

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
    }

    return (
        <div className={newListingStyle.newLayout}>
            <h1>Update Listing</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.service ? { content: 'Please enter a service', pointing: 'below' } : null}
                                label='Service'
                                placeholder='Service'
                                name='service'
                                value={form.service}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.status ? { content: 'Please enter a status', pointing: 'below' } : null}
                                label='Status'
                                placeholder='Status'
                                name='status'
                                value={form.status}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.location ? { content: 'Please enter a location', pointing: 'below' } : null}
                                label='Location'
                                placeholder='Location'
                                name='location'
                                value={form.location}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='Descriprtion'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                value={form.description}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

EditListing.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${baseURL}/api/listings/${id}`);
    const { data } = await res.json();

    return { listing: data }
}

export default EditListing;