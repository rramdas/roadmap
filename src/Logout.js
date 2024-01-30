import React from 'react';
import firebase from './firebaseConfig';

function Logout() {
  return (
    <button onClick={() => firebase.auth().signOut()}>Logout</button>
  );
}

export default Logout;
