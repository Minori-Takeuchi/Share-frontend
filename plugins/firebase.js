import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBFjWv95qOyWlG-6RbxqQ_2p6LoZ_mNPRQ",
    authDomain: "developmentfirebase-7d393.firebaseapp.com",
    projectId: "developmentfirebase-7d393",
    storageBucket: "developmentfirebase-7d393.appspot.com",
    messagingSenderId: "487540809698",
    appId: "1:487540809698:web:6de3291875c202e8b7e3bb",
    measurementId: "G-V5DYVEM8JP"
  });
}

export default firebase;