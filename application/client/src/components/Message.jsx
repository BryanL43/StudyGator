/**************************************************************
* Author(s): MIN YE THWAY KHAING
* Last Updated: 11/10/2024
*
* File:: Message.jsx
*
* Description:: 

**************************************************************/

import React from 'react';
import useMediaQuery from '../utils/useMediaQuery';
const convertDate = require('../utils/dateConverter');

const Message = ({ name, email, title, content, date, onClick }) => {
    const isMediumScreen = useMediaQuery('(min-width: 480px)');
    const isSmallScreen = useMediaQuery('(max-width: 1545px)');

    const truncateAtWord = (text, word) => {
        const index = text.indexOf(` ${word} `);
        return index !== -1 ? text.substring(0, index) : text; 
    };
    

    // Render tablet size message
    if (isMediumScreen && isSmallScreen) {
        return (
            <>
                <tr className="cursor-pointer" onClick={onClick}>
                    <td className="px-1 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900">{name}</div>
                            <div className="text-sm leading-5 text-gray-500">{email}</div>
                        </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900 truncate">
                            {title && title.length > 20 ? `${title.substring(0, 20)}...` : title}
                        </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-500 truncate line-clamp-2">
                            {content && content.length > 20 ? `${content.substring(0, 20)}...` : content}
                        </div>
                    </td>

                    <td className="px-auto py-4 border-b border-gray-200">
                        <div className="text-sm pr-8 leading-5 text-gray-500 line-clamp-2 text-clip">{date ? truncateAtWord(convertDate(date), 'at') : null}</div>
                    </td>
                </tr>
            </>
        )
    }

    // Renders mobile size message
    if (isSmallScreen) {
        return (
            <>
                <tr className="cursor-pointer" onClick={onClick}>
                    <td className="px-1 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900">{name}</div>
                            <div className="text-sm leading-5 text-gray-500">{email}</div>
                        </div>
                    </td>

                    <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-500 line-clamp-2">
                            {content && content.length > 30 ? `${content.substring(0, 30)}...` : content}
                        </div>
                    </td>

                    <td className="px-auto py-4 border-b border-gray-200">
                        <div className="text-sm pr-8 sm-420:w-40 leading-5 text-gray-500 line-clamp-2 text-clip">{date ? truncateAtWord(convertDate(date), 'at') : null}</div>
                    </td>
                </tr>
            </>
        );
    }

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