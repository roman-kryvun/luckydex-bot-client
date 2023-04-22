// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIEr0chHYQk93p5JI7Gz1gWw40n8sP4bE",
  authDomain: "tg-web-shop.firebaseapp.com",
  projectId: "tg-web-shop",
  storageBucket: "tg-web-shop.appspot.com",
  messagingSenderId: "594617785696",
  appId: "1:594617785696:web:80955e37241a77d50fd205",
  measurementId: "G-B0EK1QY190"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
