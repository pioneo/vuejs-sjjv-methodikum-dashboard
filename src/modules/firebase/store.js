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
        firebaseCollections: null,

        // items Methodik etc.
        items: {
            methodik: [],
            degree: [],
            techniqueGroup: []
        }
    },
    getters: {
        user: state => {
            return state.user
        },
        firebaseCollections: state => {
            return state.firebaseCollections
        },
        itemsMethodik: state => {
            return state.items.methodik
        },
        itemsDegree: state => {
            return state.items.degree
        },
        itemsTechniqueGroup: state => {
            return state.items.techniqueGroup
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
        },
        SET_ITEMS_METHODIK(state, itemsMethodik) {
            state.items.methodik = itemsMethodik
        },
        SET_ITEMS_DEGREE(state, itemsDegree) {
            state.items.degree = itemsDegree
        },
        SET_ITEMS_TECHNIQUEGROUP(state, itemsTechniqueGroup) {
            state.items.techniqueGroup = itemsTechniqueGroup
        }
    },
    actions: {
        /**
        * Set items for Methodik, degrees, etc.
        * TODO: retrieve from a firebase collection.
        */
        async setItems({ commit }) {
            const itemsMethodik = [
                "Technikvoraussetzungstraining",
                "Technikerwerbstraining",
                "Technikanwendungstraining",
                "Technikergänzungstraining",
            ];
            commit('SET_ITEMS_METHODIK', itemsMethodik)

            const itemsDegree = [
                "6. Kyu (weiß)",
                "5. Kyu (gelb)",
                "4. Kyu (orange)",
                "3. Kyu (grün)",
                "2. Kyu (blau)",
                "1. Kyu (braun)",
                "1. Dan (schwarz)",
                "2. Dan (schwarz)",
                "3. Dan (schwarz)",
                "4. Dan (schwarz)",
                "5. Dan (schwarz)",
            ];
            commit('SET_ITEMS_DEGREE', itemsDegree)

            const itemsTechniqueGroup = ["Atemitechniken", "Wurftechniken", "Hebeltechniken"];
            commit('SET_ITEMS_TECHNIQUEGROUP', itemsTechniqueGroup)
        },
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
         * @param {object} payload - The data to be stored as document in a specific collection defined by collectionName.
         * @param {string} payload.collectionName - The name of the collection.
         * @param {object} payload.data - The JSON data to be stored.
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