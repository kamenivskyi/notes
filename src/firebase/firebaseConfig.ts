// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbz-IZGZ_WXFZxIQE_ICxuVuJ7fKrUNVc",
  authDomain: "notes-task-5e142.firebaseapp.com",
  projectId: "notes-task-5e142",
  storageBucket: "notes-task-5e142.appspot.com",
  messagingSenderId: "768467341594",
  appId: "1:768467341594:web:b62b139a9f94e053281ca3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const db = getFirestore();
