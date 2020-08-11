import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import newListingStyle from '../../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css'; 
import cookie from 'js-cookie';
import baseURL from '../../../utils/baseURL';

const EditReward = ({ reward }) => {
    const [form, setForm] = useState({ name: reward.name, condition: reward.condition, description: reward.description });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateReward();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateReward = async () => {
        try {
            var json = form;
            const res = await fetch(`${baseURL}/api/rewards/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json)
            })
            router.push("/rewards");
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

        if (!form.name) {
            err.service = 'Name is required';
        }
        if (!form.condition) {
            err.status = 'Condition is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    }

    return (
        <div className={newListingStyle.newLayout}>
            <h1>Update Reward</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.service ? { content: 'Please enter a name', pointing: 'below' } : null}
                                label='Name'
                                placeholder='Name'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.status ? { content: 'Please enter condition', pointing: 'below' } : null}
                                label='Condition'
                                placeholder='Condition'
                                name='condition'
                                value={form.condition}
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

EditReward.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${baseURL}/api/rewards/${id}`);
    const { data } = await res.json();

    return { reward: data }
}

export default EditReward;