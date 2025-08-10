// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIOUcN3KqpNW8BmQMUy0BfxN3VXaxvZvs",
  authDomain: "mediterack.firebaseapp.com",
  projectId: "mediterack",
  storageBucket: "mediterack.firebasestorage.app",
  messagingSenderId: "1048061707564",
  appId: "1:1048061707564:web:03c63f3cfcce68c2a91889",
  measurementId: "G-NXGJ8HE35C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
