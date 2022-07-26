/**
 * @author Kerstin Neininger <kerstin.neininger@gmail.com>
 */

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './firebaseConfig.json'
import { getAuth } from "firebase/auth";

/**
* Initializes and exports Firebase Firestore and auth instance.
*
* @returns {object}
*/
const app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore()
export const auth = getAuth(app)