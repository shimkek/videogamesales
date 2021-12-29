import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDC2sMf0c3Weol2jX9W3KlGhGVm0Y3XMRg",
  authDomain: "videogamesales-43fbd.firebaseapp.com",
  databaseURL:
    "https://videogamesales-43fbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "videogamesales-43fbd",
  storageBucket: "videogamesales-43fbd.appspot.com",
  messagingSenderId: "375618188872",
  appId: "1:375618188872:web:6d7b7d2a5f79432cd18a7d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.database();
