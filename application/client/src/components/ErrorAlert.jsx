/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/3/2024
*
* File:: ErrorAlert.jsx
*
* Description:: The error alert at the top of the page. This will
*               display in case of server errors.
*
**************************************************************/

import React, { useState } from 'react';

/**
 * Creates the error alert that will be displayed at the top of the page on any potential
 * fatal server error(s).
 * 
 * @param {String} message The message to display on the error alert model. 
 * @param {function} resetError The pass-by-reference to reset the error alert when it is dismissed.
 * @returns The error alert model.
 */
const ErrorAlert = ({ message, resetError }) => {
    const [closeAlert, setCloseAlert] = useState(false);

    // Handles the localize alert closure state
    const handleClose = () => {
        setCloseAlert(true);
        resetError();
    };

    return (
        <div id="alert-border-2" className={`${closeAlert ? "hidden" : ""} fixed top-0 left-0 right-0 z-50 flex items-center p-4 text-red-800 border-t-4 border-red-300 bg-red-50`} role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ms-3 text-sm font-medium">
                {message}
            </div>
            <button type="button" onClick={handleClose} className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-border-2" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    )
}

export default ErrorAlert