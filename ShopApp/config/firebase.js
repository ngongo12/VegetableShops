// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkwTpQCNS_C9TRQi7ZmOtXJ-WabbMGfZM",
  authDomain: "vegetalbeshop.firebaseapp.com",
  projectId: "vegetalbeshop",
  storageBucket: "vegetalbeshop.appspot.com",
  messagingSenderId: "531411339686",
  appId: "1:531411339686:web:d4eb07201b00ef6f5c2767"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage();
//export const messaging = getMessaging();

export default {
    firebase,
    storage,
    //messaging
}