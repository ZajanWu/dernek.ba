import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXVack0eG6gknJzn4NRCoJLmQuHbKnMKU",
  authDomain: "dernek-ba.firebaseapp.com",
  projectId: "dernek-ba",
  storageBucket: "dernek-ba.appspot.com",
  messagingSenderId: "514037677661",
  appId: "1:514037677661:web:1a541244e3e1d8136357b4",
  measurementId: "G-EHRB9JY150",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
