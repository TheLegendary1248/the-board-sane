import React from 'react';
import ReactDOM from 'react-dom/client';
import Head from './components/defHead';
import Body from './components/defBody';
import Home from './components/home'
import About from './components/about'
import Login from './components/login'
import Board from './components/board'
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Body/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
