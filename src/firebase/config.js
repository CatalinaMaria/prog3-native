import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC34kmkvKa_TtxvCk9Qt5Cj9ekhvkwnZrw",
  authDomain: "pro3-integrador2.firebaseapp.com",
  projectId: "pro3-integrador2",
  storageBucket: "pro3-integrador2.appspot.com",
  messagingSenderId: "1033026523245",
  appId: "1:1033026523245:web:0065493f7650dbaa9b6f64"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()