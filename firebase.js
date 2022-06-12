// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {getFirestore, collection, setDoc, addDoc, deleteDoc, doc, updateDoc, getDoc} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const colRef = collection(db, 'users')

export function signup(firstName, lastName, email, contact, password, birthday) {
  createUserWithEmailAndPassword(auth, email, password);
  setDoc(doc(db, "users", auth.currentUser.uid), 
    {
      First_Name: firstName,
      Last_Name: lastName,
      Email: email,
      Contact: contact,
      Birthday: birthday,
      Sit_Up: 0,
      Push_Up: 0,
      Running: 0,
      Ippt_Score: 0,
      NS_Fit: 0,
      NS_Fit_URL: ""
    }
  )
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}


export function logout() {
  return signOut(auth);
}

export function updatePushUp(pushUp) {
  updateDoc(doc(db, "users", auth.currentUser.uid), 
    {
      Push_Up: push
    }
  )
}

export function updateSitUp(sitUp) {
  updateDoc(doc(db, "users", auth.currentUser.uid), 
    {
      Sit_Up: sitUp
    }
  )
}

export function updateRunning(running_time) {
  updateDoc(doc(db, "users", auth.currentUser.uid), 
    {
      Running: running_time
    }
  )
}

export function updateIpptScore(ipptScore) {
  updateDoc(doc(db, "users", auth.currentUser.uid), 
    {
      Ippt_Score: ipptScore
    }
  )
}

export function updateNsFitUrl(nsFitUrl) {
  updateDoc(doc(db, "users", auth.currentUser.uid), 
    {
      NS_Fit_URL: nsFitUrl
    }
  )
}

//increment the number of time the users complete ns fit
export function updateNsFit() {
  updateDoc(doc(db, "users", auth.currentUser.uid), 
    {
      NS_Fit: increment(1)
    }
  )
}

export function getPushUp(pushUp) {
  return getDoc(doc(db, "users", auth.currentUser.uid))
}



/*
// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
*/