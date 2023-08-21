import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn1K7nQY2JZsvyLL6xQ76FJ-bCUYIZkkk",
  authDomain: "homepage-b81c7.firebaseapp.com",
  projectId: "homepage-b81c7",
  storageBucket: "homepage-b81c7.appspot.com",
  messagingSenderId: "1084510891416",
  appId: "1:1084510891416:web:221354eb3e7b4e6fb08fed",
  measurementId: "G-ESLL518VLE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
