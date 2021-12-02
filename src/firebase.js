// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

// firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();

// export default firebase;
// export const auth = firebase.auth();
