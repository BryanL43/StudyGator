/**************************************************************
* Author(s): MIN YE THWAY KHAING
* Last Updated: 11/10/2024
*
* File:: Message.jsx
*
* Description:: 

**************************************************************/

import React from 'react';
const convertDate = require('../utils/dateConverter');

const Message = ({ name, email, title, content, date, onClick }) => {
    return (
        <>
            <tr className="cursor-pointer" onClick={onClick}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-gray-900">{name}</div>
                        <div className="text-sm leading-5 text-gray-500">{email}</div>
                    </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900 truncate">
                        {title && title.length > 40 ? `${title.substring(0, 40)}...` : title}
                    </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500 truncate">
                        {content && content.length > 100 ? `${content.substring(0, 100)}...` : content}
                    </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500 truncate">{date ? convertDate(date) : null}</div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500"></div>
                </td>
            </tr>
        </>
    );
};

export default Message;