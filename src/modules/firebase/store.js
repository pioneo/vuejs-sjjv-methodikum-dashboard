/**
 * @author Kerstin Neininger <kerstin.neininger@gmail.com>
 */

import router from '../../router'
import {
    //getAuth,
    //createUserWithEmailAndPassword,
    //signInWithEmailAndPassword,
    signOut,
    signInAnonymously,
    //onAuthStateChanged
} from "firebase/auth";
//import 'firebase/compat/auth';
import { db } from './assets/firebase';
import { auth } from './assets/firebase';

export const FirebaseStore = {
    state: {
        // Firestore user
        user: null,
        // Firestore collections and documents contained therein
        firebaseCollections: null
    },
    getters: {
        user: state => {
            return state.user
        },
        firebaseCollections: state => {
            return state.firebaseCollections
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        CLEAR_USER(state) {
            state.user = null
        },
        SET_FIREBASE_COLLECTIONS(state, firebaseCollections) {
            state.firebaseCollections = firebaseCollections
        }
    },
    actions: {
        /**
         * User Login.
         * Note that this function should be used for anonymous users.
         * Usage of Firebase SDK.
         */
        async loginAnonymous({ commit }) {
            try {
                await signInAnonymously(auth)
            } catch (error) {
                //const errorCode = error.code;
                const errorMessage = error.message;
                throw errorMessage
            }
            commit('SET_USER', auth.currentUser)
            router.push('/')
        },

        /**
         * User clearance and redirection to Login page.
         * Note that this function should be used for anonymous users.
         * Firebase SDK not used here as signout of an anonymous user using the SDK will again create a new (anonymous) user at Login.
         */
        async logoutAnonymous({ commit }) {
            commit('CLEAR_USER')
            router.push('/login')
        },

        /**
         * User logout and redirection to Login page.
         * Note that this function should be used for non-anonymous users.
         * Usage of Firebase SDK.
         */
        async logout({ commit }) {
            try {
                await signOut(auth)
            } catch (error) {
                //const errorCode = error.code;
                const errorMessage = error.message;
                throw errorMessage
            }
            commit('CLEAR_USER')
            router.push('/login')
        },

        /**
         * Retrieve user state and change vue route accordingly
         * Usage of Firebase SDK.
         * 
         */
        fetchUser({ commit }) {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    commit('SET_USER', user)
                    if (router.isReady() && router.currentRoute.value.path === '/login') {
                        router.push('/')
                    }
                } else {
                    // User is signed out
                    commit('CLEAR_USER')
                }
            })
        },

        /**
         * Write data to a Firestore collection.
         * Usage of Firebase SDK.
         * TODO: add commit(..)
         * 
         * @param {Object} payload - The data to be stored as document in a specific collection defined by collectionName.
         * @param {string} payload.collectionName - The name of the collection.
         * @param {Object} payload.data - The JSON data to be stored.
         * 
         */
        async write({ commit }, payload) {
            try {
                await db
                    .collection(payload.collectionName)
                    .add(payload.data);
            } catch (error) {
                //const errorCode = error.code;
                const errorMessage = error.message;
                throw errorMessage
            }
        },

        /**
         * Retrieve all relevant collections from Firestore.
         * Commits collections object with collection name as keys and documents list as values.
         * Usage of Firebase SDK.
         * TODO: might call this function with collection names as arguments
         * 
         */
        async getCollections({ commit }) {
            try {
                const collections = { "uebungen": [], "techniken": [] }
                for (const [index, element] of Object.keys(collections).entries()) {
                    const { docs } = await db.collection(element).get()
                    const entries = docs.map(doc => {
                        const { id } = doc
                        const data = doc.data()
                        return { id, ...data }
                    })
                    collections[element] = entries
                }
                commit('SET_FIREBASE_COLLECTIONS', collections)
            } catch (error) {
                //const errorCode = error.code;
                const errorMessage = error.message;
                //console.log(errorMessage)
                throw errorMessage
            }
        }
    }
}