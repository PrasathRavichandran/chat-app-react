import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArhSfn1E3ZyzOMq8bjHVjQK16OjK3Sp3Y",
  authDomain: "chat-app-react-99e2b.firebaseapp.com",
  projectId: "chat-app-react-99e2b",
  storageBucket: "chat-app-react-99e2b.appspot.com",
  messagingSenderId: "123344310417",
  appId: "1:123344310417:web:da04cc04de7a3ebb6fef30",
  measurementId: "G-2FR7JYB1CL",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export default app;
