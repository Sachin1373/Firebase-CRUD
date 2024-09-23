import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC9NdhmthWXzzivwl45nKU5x_lXm8LmjbI",
  authDomain: "test-firebase-c6dbb.firebaseapp.com",
  projectId: "test-firebase-c6dbb",
  storageBucket: "test-firebase-c6dbb.appspot.com",
  messagingSenderId: "835522638227",
  appId: "1:835522638227:web:5d8543dd549aaf1c1df866"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);