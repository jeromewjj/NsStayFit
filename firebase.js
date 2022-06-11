// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.firebase_key.FIREBASE_API_KEY,
  authDomain: process.firebase_key.FIREBASE_AUTH_DOMAIN,
  projectId: process.firebase_key.FIREBASE_PROJECT_ID,
  storageBucket: process.firebase_key.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.firebase_key.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.firebase_key.FIREBASE_APP_ID
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth }