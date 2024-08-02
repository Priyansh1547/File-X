// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHyrGJIk1A2NO1i1Yb_tBSSuhZiRoWklM",
  authDomain: "filex-f33bf.firebaseapp.com",
  projectId: "filex-f33bf",
  storageBucket: "filex-f33bf.appspot.com",
  messagingSenderId: "924895718668",
  appId: "1:924895718668:web:876884671ac7e79d046d29",
  measurementId: "G-KFLVM8XFE6",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
