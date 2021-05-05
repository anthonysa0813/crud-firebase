import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8tbetdoO6xuEl1YGEe7SUeAEe6xoUck0",
  authDomain: "crud-eed3b.firebaseapp.com",
  projectId: "crud-eed3b",
  storageBucket: "crud-eed3b.appspot.com",
  messagingSenderId: "609344550521",
  appId: "1:609344550521:web:70763c33087109c51346a8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
