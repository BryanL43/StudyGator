/**************************************************************
* Author(s): MIN YE THWAY KHAING
* Last Updated: 11/10/2024
*
* File:: Message.jsx
*
* Description:: 

**************************************************************/
import React, { useState } from 'react';

const Message = ({ name, email, subject, content, date }) => {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <tr className="cursor-pointer" onClick={toggleModal}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="TosCheckBox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-shrink-0 w-10 h-10 ml-4">
                            <img className="w-10 h-10 rounded-full" src="/sillydogpfp.webp" alt="" />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900">{name}</div>
                            <div className="text-sm leading-5 text-gray-500">{email}</div>
                        </div>
                    </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">{subject}</div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">{content}</div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">{date}</div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500"></div>
                </td>
            </tr>

            {/* Modal for Message Details */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-2xl font-semibold">{subject}</h3>
                            <button
                                onClick={toggleModal}
                                className="text-gray-800 hover:text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                        <p className="text-gray-600 mb-2">
                            <strong>From:</strong> {name} (<a href={`mailto:${email}`} className="text-blue-600">{email}</a>)
                        </p>
                        <p className="text-gray-600 mb-4"><strong>Date Sent:</strong> {date}</p>
                        
                        <div className="mb-4 p-4 bg-gray-100 rounded-lg" style={{ minHeight: '180px', maxHeight: '300px', overflowY: 'auto' }}>
                            <p className="text-gray-800">{content}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;

