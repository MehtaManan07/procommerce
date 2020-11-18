import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyC_j2Q69BtpG9aQCum1lCeIsz9gbEXbQTE",
    authDomain: "pro-commerce-5f6db.firebaseapp.com",
    databaseURL: "https://pro-commerce-5f6db.firebaseio.com",
    projectId: "pro-commerce-5f6db",
    storageBucket: "pro-commerce-5f6db.appspot.com",
    messagingSenderId: "354012589203",
    appId: "1:354012589203:web:5b65f07f016708be3fb166",
    measurementId: "G-H11EL20TX4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()