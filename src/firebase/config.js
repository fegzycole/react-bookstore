
import firebase from 'firebase';
// eslint-disable-next-line no-unused-vars
import firestore from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyCNlLGvq2IypzqyLlf0KQg4n2tviTcl18A',
  authDomain: 'bookstore-3e8e0.firebaseapp.com',
  databaseURL: 'https://bookstore-3e8e0.firebaseio.com',
  projectId: 'bookstore-3e8e0',
  storageBucket: 'bookstore-3e8e0.appspot.com',
  messagingSenderId: '122128712854',
  appId: '1:122128712854:web:97003b8dc63885de206eb7',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
