import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './firebaseConfig.json'

/**
* Initializes and exports Firebase Firestore instance.
*
* @returns {object}
*/
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()