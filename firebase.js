

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3hEcSGBCYouZdvTHMi-MKxDeMtdvNMUA",
  authDomain: "inventorytask-11644.firebaseapp.com",
  databaseURL: "https://inventorytask-11644-default-rtdb.firebaseio.com",
  projectId: "inventorytask-11644",
  storageBucket: "inventorytask-11644.appspot.com",
  messagingSenderId: "871010684824",
  appId: "1:871010684824:web:12900ec830b7cc2bcfe5ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
export const auth = getAuth(app);
export default db