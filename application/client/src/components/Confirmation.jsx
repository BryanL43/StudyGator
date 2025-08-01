/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/3/2024
*
* File:: Confirmation.jsx
*
* Description:: The confirmation pop-up model for deleting a listing
*               or a message.
*
**************************************************************/

import React from 'react';

/**
 * Dynamically create the confirmation model, allowing for confirmation prompt to be use in various situations.
 * 
 * @param {boolean} deleteWarning The visibility state of the confirmation model.
 * @param {function} toggleDeleteWarning The pass-by-reference to toggle the visibility of the model.
 * @param {function} onConfirm The pass-by-reference to trigger an action if the user validates their action.
 * @param {String} message The message to display on the confirmation model.
 * @returns The confirmation model.
 */
const Confirmation = ({ deleteWarning, toggleDeleteWarning, onConfirm, message }) => {

    return (
        <div id="popup-modal" tabIndex="-1" className={`${deleteWarning ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center`}>
            <div className="absolute inset-0 transition-all duration-500 bg-black opacity-30" />
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <button type="button" onClick={toggleDeleteWarning} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">{message}</h3>
                        <button onClick={onConfirm} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button onClick={toggleDeleteWarning} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;