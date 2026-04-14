// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbtqf1zjfz2XQMEuIIJVk2vKesvkEyHDU",
  authDomain: "bswportalv2.firebaseapp.com",
  projectId: "bswportalv2",
  storageBucket: "bswportalv2.appspot.com",
  messagingSenderId: "968301915029",
  appId: "1:968301915029:web:60706944804a513afda49c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb=getFirestore(app);
export const firebaseStorage=getStorage(app);