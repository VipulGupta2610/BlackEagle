
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "blackeagle-2acfa.firebaseapp.com",
  projectId: "blackeagle-2acfa",
  storageBucket: "blackeagle-2acfa.firebasestorage.app",
  messagingSenderId: "709772535069",
  appId: "1:709772535069:web:65bb42889db8dd367eedf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()