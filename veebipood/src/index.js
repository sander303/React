import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// \React-05-2022\veebipood> npm install react-router-dom
// lisab node_modules kausta Routinguks vajalikud koodilõigud
// Routing on Reacti mõistes erinevate URL-de ja komponentide seosed
// ehk võimalik liikuda localhost:3000/ostukorv -- näitab mingit kindlat komponenti

//<BrowserRouter> tähistab koodilõiku react-router-dom'st
//sellega peab ümbritsema oma rakenduse, mida tähistab App.js
//seda peab tegema iga kord, kui oma rakendusele tahan lisada routingut