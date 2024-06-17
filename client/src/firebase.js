// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBN0Zpd9aadtvoHTQUp1A9aYXZf5o5-U7g",
  authDomain: "blogapp-424914.firebaseapp.com",
  projectId: "blogapp-424914",
  storageBucket: "blogapp-424914.appspot.com",
  messagingSenderId: "241068656741",
  appId: "1:241068656741:web:0b6497671b19c9b8135e8c",
  measurementId: "G-L08XFYEV65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, provider, storage };
