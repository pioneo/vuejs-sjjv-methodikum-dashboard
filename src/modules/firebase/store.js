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

// TODO: document functions
export const FirebaseStore = {
    state: {
        user: null,
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

        async logoutAnonymous({ commit }) {
            //await signOut(auth) //signout anonymous will create new user at Login..
            commit('CLEAR_USER')
            router.push('/login')
        },

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

        // TODO: add commit(..)
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
         * 
         * Retrieve all relevant collections from Firestore.
         * Commits collections object with collection name as keys and documents list as values.
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