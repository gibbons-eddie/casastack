import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Segment } from 'semantic-ui-react';
import newListingStyle from '../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import Map from '../../components/maps/Map';
import baseURL from '../../utils/baseURL';
import calculateTotal from '../../utils/calculateTotal';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import catchErrors from '../../utils/errorCatcher';
import cookie from 'js-cookie';

const Listing = ({ user, listing }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false); // for checkout
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteListing();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);

  const close = () => setConfirm(false);

  const openAccept = async () => {
    try {
      var json = listing;
      //this grabs the (hopefully) logged in user's email through cookies and sets the json's acceptor attribute to that email
      json.acceptor = user.email;
      json.status = 'accepted';
      // If listing is a service, add the volunteer's address as listing's location
      if (user.role === 'volunteer' && listing.service === 'service')
        json.location = user.address;
      // CONSOLE TESTING-----------------------------------------------
      console.log(JSON.stringify(json));
      console.log(json.acceptor);
      // CONSOLE TESTING-----------------------------------------------
      const res = await fetch(`${baseURL}/api/listings/${router.query.id}`, {
        method: 'PUT',
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

  const drop = async () => {
    try {
      //comments so people can understand - by Joseph //if no token exists in the cookies then this should return undefined -> false
      //this is whatever they input into the edit form (as a json object)
      var json = listing;
      //this grabs the (hopefully) logged in user's email through cookies and sets the json's acceptor attribute to that email
      json.acceptor = '';
      json.status = 'open';
      // CONSOLE TESTING-----------------------------------------------
      console.log(JSON.stringify(json));
      console.log(json.acceptor);
      // CONSOLE TESTING-----------------------------------------------
      const res = await fetch(`${baseURL}/api/listings/${router.query.id}`, {
        method: 'PUT',
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

  const complete = async () => {
    try {
      //comments so people can understand - by Joseph
      if (true) {
        //if no token exists in the cookies then this should return undefined -> false
        //this is whatever they input into the edit form (as a json object)
        var json = listing;
        //this grabs the (hopefully) logged in user's email through cookies and sets the json's acceptor attribute to that email
        json.status = 'completed';
        // CONSOLE TESTING-----------------------------------------------
        console.log(JSON.stringify(json));
        console.log(json.acceptor);
        // CONSOLE TESTING-----------------------------------------------
      }
      const res = await fetch(`${baseURL}/api/listings/${router.query.id}`, {
        method: 'PUT',
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

  const deleteListing = async () => {
    const listingId = router.query.id;
    try {
      const deleted = await fetch(`${baseURL}/api/listings/${listingId}`, {
        method: 'Delete',
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  // const temporaryCustomerAddress = '1110 SW 3rd Ave, Gainesville, FL, USA'; // temporary hardcoded customer address

  /*
  simple logical functions for determining information about the user/listing for the purposes
  of conditionally rendering the various buttons. all of them should execute as the page is loaded.
  */
  var isAcceptor = false;
  if (listing.acceptor === user.email) {
    isAcceptor = true;
  }
  var isOwner = false;
  if (listing.owner === user.email) {
    isOwner = true;
  }
  var isCompleted = false;
  if (listing.status === 'completed') {
    //breaks for old listings where owner is undefined
    isCompleted = true;
  }

  var isAccepted = false;
  if (listing.status === 'accepted') {
    isAccepted = true;
  }

  var isPaid = false;
  if (listing.status === 'paid') {
    isPaid = true;
  }
  // console.log(isCompleted);
  // console.log(isAcceptor);

  async function handleCheckout(paymentData) {
    try {
      var json = listing;
      setLoading(true);
      const url = `${baseURL}/api/checkoutAPI`;
      const token = cookie.get('token');
      const payload = { paymentData, ...listing };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
      json.status = 'paid';
      const pay = await fetch(`${baseURL}/api/listings/${router.query.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={newListingStyle.newLayout}>
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{listing.service}</h1>
          <Segment>
            <p>
              <b>Job status:</b> {listing.status}
            </p>
            {listing.service == 'delivery' ? (
              <p>
                <b>Store location:</b> {listing.location}
              </p>
            ) : null}
            <p>
              <b>Description:</b> {listing.description}
            </p>
            <p>
              <b>Price:</b> ${listing.price}
            </p>
            <p>
              <b>** TESTING ** listing coordinates: </b>
              {listing.locationLat + ' ' + listing.locationLng}
            </p>
            <Map listingObj={listing} user={user} />

            <br></br>
            {isOwner && !isAccepted && !isPaid ? (
              <Button
                color='red'
                onClick={open}
                style={{ fontFamily: 'Montserrat' }}
              >
                Close
              </Button>
            ) : (
              <div></div>
            )}

            {isAcceptor || isOwner ? (
              <div></div>
            ) : (
              <Button
                color='green'
                onClick={openAccept}
                style={{ fontFamily: 'Montserrat' }}
              >
                Accept
              </Button>
            )}
            {isAcceptor && !isPaid ? (
              <Button
                color='red'
                onClick={drop}
                style={{ fontFamily: 'Montserrat' }}
              >
                Drop
              </Button>
            ) : (
              <div></div>
            )}
            {!isCompleted && isAcceptor && isPaid ? (
              <Button
                color='green'
                onClick={complete}
                style={{ fontFamily: 'Montserrat' }}
              >
                Complete
              </Button>
            ) : (
              <div></div>
            )}
            {!isCompleted && isOwner && isAccepted ? (
              // <Checkout {...listing}/>
              <StripeCheckout
                name={listing.service}
                description='CasaStack'
                amount={calculateTotal(listing.price)}
                currency='USD'
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                token={handleCheckout}
                stripeKey={process.env.REACT_CHECKOUT_KEY}
                triggerEvent='onClick'
                style={{ fontFamily: 'Montserrat' }}
              >
                <Button
                  color='violet'
                  content='Pay'
                  disabled={success || isPaid}
                  style={{ fontFamily: 'Montserrat' }}
                />
              </StripeCheckout>
            ) : (
              <div></div>
            )}
            {!isCompleted && isOwner && isPaid ? (
              <Button
                color='violet'
                disabled
                style={{ fontFamily: 'Montserrat' }}
              >
                Paid!
              </Button>
            ) : (
              <div></div>
            )}
          </Segment>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

Listing.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${baseURL}/api/listings/${id}`);
  const { data } = await res.json();

  return { listing: data };
};

export default Listing;
