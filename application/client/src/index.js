/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 9/19/2024
*
* File:: index.js
*
* Description:: Entry point for the React application.
*               Loads DOM elements, javascripts, and styling.
*
**************************************************************/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);