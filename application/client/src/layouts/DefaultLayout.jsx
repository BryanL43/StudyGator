/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 9/19/2024
*
* File:: DefaultLayout.jsx
*
* Description:: This file establishes the layout for the web page.
*               In other words, the order of components
*               (Navbar, Main Content, and Footer).
*
**************************************************************/

import React from 'react'
import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default DefaultLayout