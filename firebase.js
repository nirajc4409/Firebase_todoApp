import firebase from 'firebase';
import Config from 'react-native-config';

var firebaseConfig = {
  apiKey: 'AIzaSyD-_mNNnDRZssQvQMOGIM-rHS-RPnsg8WQ',
  authDomain: 'todoapp-687d6.firebaseapp.com',
  databaseURL: 'https://todoapp-687d6-default-rtdb.firebaseio.com',
  projectId: 'todoapp-687d6',
  storageBucket: 'todoapp-687d6.appspot.com',
  messagingSenderId: '1009647409950',
  appId: '1:1009647409950:web:03107800ddf8d24c17070f',
  measurementId: 'G-QH41BS7FKF',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default firebase;

export const db = firebase.database().ref();
