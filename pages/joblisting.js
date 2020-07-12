import Layout from "../components/homePage/Layout";
import JobListing from "../components/joblistingsPage/CreateJobListing";

/*
import mongoose from 'mongoose';
import config from '../config.js';

//connect to database
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log('Successfully connected to mongo atlas database.');
});
*/
const joblisting1 = (props) => 
<Layout>
    <JobListing/>
</Layout>;

export default joblisting1;