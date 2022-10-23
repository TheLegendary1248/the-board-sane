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
