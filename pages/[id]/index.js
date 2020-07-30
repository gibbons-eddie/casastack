import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Segment } from 'semantic-ui-react';
import newListingStyle from '../../components/joblistingsPage/jobListingPageStyles/joblisting.module.css';
import Map from '../../components/maps/Map';

const Listing = ({ user, listing }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
      // CONSOLE TESTING-----------------------------------------------
      console.log(JSON.stringify(json));
      console.log(json.acceptor);
      // CONSOLE TESTING-----------------------------------------------
      const res = await fetch(
        `http://localhost:3000/api/listings/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(json),
        }
      );
      router.push('/joblisting');
    } catch (error) {
      console.log(error);
    }
  };

  const drop = async () => {
    try {
      //comments so people can understand - by Joseph //if no userToken exists in the cookies then this should return undefined -> false
      //this is whatever they input into the edit form (as a json object)
      var json = listing;
      //this grabs the (hopefully) logged in user's email through cookies and sets the json's acceptor attribute to that email
      json.acceptor = '';
      json.status = 'open';
      // CONSOLE TESTING-----------------------------------------------
      console.log(JSON.stringify(json));
      console.log(json.acceptor);
      // CONSOLE TESTING-----------------------------------------------
      const res = await fetch(
        `http://localhost:3000/api/listings/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(json),
        }
      );
      router.push('/joblisting');
    } catch (error) {
      console.log(error);
    }
  };

  const complete = async () => {
    try {
      //comments so people can understand - by Joseph
      if (true) {
        //if no userToken exists in the cookies then this should return undefined -> false
        //this is whatever they input into the edit form (as a json object)
        var json = listing;
        //this grabs the (hopefully) logged in user's email through cookies and sets the json's acceptor attribute to that email
        json.status = 'completed';
        // CONSOLE TESTING-----------------------------------------------
        console.log(JSON.stringify(json));
        console.log(json.acceptor);
        // CONSOLE TESTING-----------------------------------------------
      }
      const res = await fetch(
        `http://localhost:3000/api/listings/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(json),
        }
      );
      router.push('/joblisting');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteListing = async () => {
    const listingId = router.query.id;
    try {
      const deleted = await fetch(
        `http://localhost:3000/api/listings/${listingId}`,
        {
          method: 'Delete',
        }
      );

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  const temporaryCustomerAddress = '1110 SW 3rd Ave, Gainesville, FL, USA'; // temporary hardcoded customer address

  var isAcceptor = false;
  if (listing.acceptor === user.email) {
    isAcceptor = true;
  }
  var isOwner = false;
  if (listing.owner === user.email) {
    isOwner = true;
  }
  //breaks for old listings where owner is undefined
  var isCompleted = false;
  if (listing.status === 'completed') {
    isCompleted = true;
  }
  console.log(isCompleted);
  console.log(isAcceptor);

  return (
    <div className={newListingStyle.newLayout}>
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{listing.service}</h1>
          <Segment>
            <p>Job status: {listing.status}</p>
            {listing.service == 'delivery' ? (
              <p>Store location: {listing.location}</p>
            ) : null}

            <p>Description: {listing.description}</p>
            <Map
              listingObj={listing}
              //customerAddress={temporaryCustomerAddress}
              //storeAddress={listing.location}
            />

            <br></br>
            {isOwner ? (
              <Button color='red' onClick={open}>
                Delete
              </Button>
            ) : (
              <div></div>
            )}
            {isAcceptor ? (
              <div></div>
            ) : (
              <Button color='green' onClick={openAccept}>
                Accept
              </Button>
            )}
            {isAcceptor ? (
              <Button color='red' onClick={drop}>
                Drop
              </Button>
            ) : (
              <div></div>
            )}
            {!isCompleted && isAcceptor ? (
              <Button color='green' onClick={complete}>
                Complete
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
  const res = await fetch(`http://localhost:3000/api/listings/${id}`);
  const { data } = await res.json();

  return { listing: data };
};

export default Listing;
