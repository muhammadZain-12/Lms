// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTPOX1ZUjDNfM6bMCiZ3x6aymjlptkw_I",
  authDomain: "todos-list-react.firebaseapp.com",
  databaseURL: "https://todos-list-react-default-rtdb.firebaseio.com",
  projectId: "todos-list-react",
  storageBucket: "todos-list-react.appspot.com",
  messagingSenderId: "694078366496",
  appId: "1:694078366496:web:43fb46382d43c310c0ad45",
  measurementId: "G-650JN7SF7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app