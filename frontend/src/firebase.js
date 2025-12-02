import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9lXvyjHQfoy_C74VhY_xBzG6Pa4qiiA0",
    authDomain: "castorice-8de61.firebaseapp.com",
    projectId: "castorice-8de61",
    storageBucket: "castorice-8de61.firebasestorage.app",
    messagingSenderId: "500480224208",
    appId: "1:500480224208:web:2311b939243e769d02a7d5",
    measurementId: "G-D5987LQN7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
