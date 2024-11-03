import React from 'react'

const Message = ({name, email, subject, content, date}) => {
    return (
        <tr className="cursor-pointer">
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="TosCheckBox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
    )
}

export default Message