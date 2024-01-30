import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase SDK config from the Firebase Console
};

firebase.initializeApp(firebaseConfig);

export default firebase;
