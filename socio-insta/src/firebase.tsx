import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
 
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCzdWKdlAp1XjAOoHTQBTpexyhUUQYW2ko",
    authDomain: "socio-insta-98169.firebaseapp.com",
    databaseURL: "https://socio-insta-98169.firebaseio.com",
    projectId: "socio-insta-98169",
    storageBucket: "socio-insta-98169.appspot.com",
    messagingSenderId: "366232624326",
    appId: "1:366232624326:web:f54c54246b9076ecc84bc7",
    measurementId: "G-988VPRW86Z"
})

const db = firebaseApp.firestore();
const auth = firebaseApp.auth(); // Login, logout
const storage = firebaseApp.storage(); // For uploading images

export { db, auth, storage }
