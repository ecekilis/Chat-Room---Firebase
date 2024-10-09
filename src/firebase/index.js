// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGwp9v3UVdab86Gy-KZduzwzyAXSp9i5M",
    authDomain: "chat-ef900.firebaseapp.com",
    projectId: "chat-ef900",
    storageBucket: "chat-ef900.appspot.com",
    messagingSenderId: "17681652566",
    appId: "1:17681652566:web:c6656712a1dc2b36e8d4f7",
    measurementId: "G-B9CZT15WE3"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);