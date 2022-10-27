//React modules
import React from 'react';
import ReactDOM from 'react-dom/client';
//Homebrewed modules
import Nav from './views/components/nav';
import Home from './views/home'
import About from './views/about'
import Login from './views/login'
import BoardSelect from './views/boardSelect'
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from "react-router-dom";
//Import CSS
import './default.css'
//Firebase
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClxfXVrUMRCRDn38iRyqcG7OpHtkdhSMM",
  authDomain: "the-board-ab255.firebaseapp.com",
  projectId: "the-board-ab255",
  storageBucket: "the-board-ab255.appspot.com",
  messagingSenderId: "181221221415",
  appId: "1:181221221415:web:fd47e038b0a1bf0c675a02"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="board" element={<BoardSelect />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
