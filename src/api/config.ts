// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLWQlP_l6dtZaVqlOQqxnX5TEkMA6dz8I",
  authDomain: "lucky-dex.firebaseapp.com",
  projectId: "lucky-dex",
  storageBucket: "lucky-dex.appspot.com",
  messagingSenderId: "127096731399",
  appId: "1:127096731399:web:5c1ca432e8ff74be8cb7a2",
  measurementId: "G-9BR2RFJTWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const db = firebase.firestore();

export {
  db
}
