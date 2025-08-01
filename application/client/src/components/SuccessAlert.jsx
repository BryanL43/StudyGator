/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/5/2024
*
* File:: SuccessAlert.jsx
*
* Description:: The success alert at the top of the page. This will
*               display successful listing upload or message sent.
*
**************************************************************/

import React, { useState } from 'react';

/**
 * Creates the success alert that will be displayed at the top of the page on successful
 * listing upload or message sent.
 * 
 * @param {String} message The message to display on the success alert model. 
 * @param {function} onClose The pass-by-reference to reset the close the model.
 * @returns The success alert model.
 */
const SuccessAlert = ({ message, onClose }) => {
    const [closeAlert, setCloseAlert] = useState(false);

    return (
        <div id="alert-border-3" className={`${closeAlert ? "hidden" : ""} fixed top-0 left-0 right-0 z-50 flex items-center p-4 text-green-800 border-t-4 border-green-300 bg-green-50`} role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ms-3 text-sm font-medium">
                {message}
            </div>
            <button type="button" onClick={() => { setCloseAlert(!closeAlert); if (onClose) onClose(); }} className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-border-3" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    )
}

export default SuccessAlert