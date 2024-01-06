// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDki3fcbG-vqG4J0tjY99iyCNshaTjFgeA",
  authDomain: "netflixgpt-f4520.firebaseapp.com",
  projectId: "netflixgpt-f4520",
  storageBucket: "netflixgpt-f4520.appspot.com",
  messagingSenderId: "368616440139",
  appId: "1:368616440139:web:08e6ee63e54c71bebce8ce",
  measurementId: "G-FKZ6ZR3CD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();