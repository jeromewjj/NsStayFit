// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6l_n1b6XyuFmy7XaQJ_E-CnE5kJCu9_Y",
  authDomain: "ns-stay-fit-firebase-auth.firebaseapp.com",
  projectId: "ns-stay-fit-firebase-auth",
  storageBucket: "ns-stay-fit-firebase-auth.appspot.com",
  messagingSenderId: "17298916412",
  appId: "1:17298916412:web:844fce50acd3778c0c6f39"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export {auth};
//const app = initializeApp(firebaseConfig);