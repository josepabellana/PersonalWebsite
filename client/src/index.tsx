import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYbCyjvVTTcvI32HdqmXiEj3P_Ug0DAsw",
  authDomain: "personalwebsite-3b650.firebaseapp.com",
  projectId: "personalwebsite-3b650",
  storageBucket: "personalwebsite-3b650.appspot.com",
  messagingSenderId: "1064150927917",
  appId: "1:1064150927917:web:0672c419c61c84951346a4",
  measurementId: "G-YE0DT6L3KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


