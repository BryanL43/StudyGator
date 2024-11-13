/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 9/19/2024
*
* File:: App.jsx
*
* Description:: This file handles the web application's routing.
*               It acts as the "middleware" for the React application.
*
**************************************************************/

// import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import DefaultLayout from './layouts/DefaultLayout.jsx';

// Import the subpages
import Home from "./Home/Home.jsx";
import About from "./about/AboutPage.jsx";
import LoginPage from './auth/LoginPage.jsx';
import SignupPage from './auth/SignupPage.jsx';
import Results from './Home/Results.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import SearchPage from './SearchPage/SearchPage.jsx'; 
import ApplyPage from './ApplyPage/ApplyPage.jsx';  
import Detail from './DetailPage/Detail.jsx'

function App() {

    document.title = "CSC648";

    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Routes with Default Layout (Authenticated) */}
                        <Route element={<DefaultLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/about/:name" element={<About />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/results" element={<Results />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/apply" element={<ApplyPage />} />
                            <Route path="/detail" element={<Detail />} />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
