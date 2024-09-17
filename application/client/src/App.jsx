import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import DefaultLayout from './layouts/DefaultLayout.jsx';

// Import the subpages
import Home from "./Home/Home.jsx";
import About from "./about/AboutPage.jsx";

function App() {

    document.title = "CSC648";

    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>

                        {/* Default Routes */}
                        <Route element={<DefaultLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/about/:name" element={<About />} />
                        </Route>

                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
