import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './Components/Landing';
import { initializeApp } from "firebase/app";
import { ToastContainer} from 'react-toastify';
import  './scss/body.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const firebaseConfig = {
  apiKey: "AIzaSyAt7EV8BWi2csGgvCSkuuqlDFkVENXdE6M",
  authDomain: "cenicero-a40c6.firebaseapp.com",
  projectId: "cenicero-a40c6",
  storageBucket: "cenicero-a40c6.appspot.com",
  messagingSenderId: "398190165990",
  appId: "1:398190165990:web:cd42124ef2e8d2d887a027"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Landing />
    <ToastContainer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

