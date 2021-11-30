// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA5wAhueY9lkWtkhtF9DZ6O9Exis6X9rB0",
  authDomain: "middleware-abd0a.firebaseapp.com",
  projectId: "middleware-abd0a",
  storageBucket: "middleware-abd0a.appspot.com",
  messagingSenderId: "253903258363",
  appId: "1:253903258363:web:005517be5c43da0200265e",
  measurementId: "G-ZSYZTH0V60"
};
// const userType = localStorage.getItem('userType')
const actionCodeSettings = {
  url:'https://middlewareapp-new.vercel.app' ,
  handleCodeInApp: true,
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore();
// const storage = firebase.storage()
// var ui = new firebaseui.auth.AuthUI(app.auth());


// const analytics = getAnalytics(app);
export { firebase, auth, actionCodeSettings, db }
