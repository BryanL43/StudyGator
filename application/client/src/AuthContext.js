/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: AuthContext.js
*
* Description:: This file handles the web app's frontend login/logout authentication.
*               It stores new JWT token or cleans up expired ones.
*
**************************************************************/

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => {
        const storedData = localStorage.getItem('authToken');
        if (storedData) {
            return storedData;
        }
        return null;
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            // Check if the token is still valid
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser(decodedToken);
            } else {
                logout(); // Log out if the token has expired
            }
        } else {
            setUser(null);
        }
    }, [authToken]);

    const login = (token) => {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("authToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
