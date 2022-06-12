//import { auth, db } from 'firebase'
/*
export const registerUser = (firstName, lastName, email, contact, username, password, birthday) => {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
          First_Name: firstName,
          Last_Name: lastName,
          Email: email,
          Contact: contact,
          Username: username,
          Birthday: birthday,
          Sit_Up: 0,
          Push_Up: 0,
          Running: 0,
          Ippt_Score: 0,
          NS_Fit: 0
        });
    });
}

export const updatePushUp = (cred, pushUp) => {
    db.collection('users').doc(cred.user.uid).set({
        Push_Up: pushUp});
}

export const updateSitUp = (cred, sitUp) => {
    db.collection('users').doc(cred.user.uid).set({
        Sit_Up: sitUp});
}

export const updateRunning = (cred, running_time) => {
    db.collection('users').doc(cred.user.uid).set({
        Running: running_time});
}

export const updateIpptScore = (cred, ipptScore) => {
    db.collection('users').doc(cred.user.uid).set({
        Ippt_Score: ipptScore});
}
*/