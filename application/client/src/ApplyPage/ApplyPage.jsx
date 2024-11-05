/**************************************************************
* Author(s): Kenneth Wen
* Last Updated: 11/2/2024
*
* File:: TutorListingForm.jsx
*
* Description:: 
*
**************************************************************/

import React from 'react'

const ApplyPage = () => {
    return (
        <div className="top-0 flex items-center justify-center sm:min-h-screen bg-gray-100">
            <img src="/SFSU-img-4.png" className="absolute w-full h-full object-cover z-10 filter brightness-[0.8] sm:block hidden" alt="Bird eye view of SFSU" />
            <form action="#" className="w-full sm:max-w-md relative z-20 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow max-h-[650px] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Apply As Tutor Form</h2>
                <div className="flex flex-col gap-4 mb-4 ">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name *</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type full name" required />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">SFSU Email *</label>
                        <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type SFSU email" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price $/hr *</label>
                        <input type="number" name="price" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter price per hour" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Which Subject Are You Tutoring? *</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                            <option value="">---</option>
                            <option value="English">English</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Humanities">Humanities</option>
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Short pitch for listing *</label>
                        <textarea id="description" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 " placeholder="Advertise yourself here in 100 words!"></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">About Me *</label>
                        <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 " placeholder="Write your tutor bio here"></textarea>
                    </div>
                </div>
                {/* Upload Picture*/}
                <div className="pb-2">
                    <label
                        htmlFor="file_input"
                        className="block mb-1 text-sm font-medium text-gray-900"
                    >
                        Upload Tutor Listing Picture
                    </label>
                    <input
                        className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring focus:ring-blue-500"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                    />
                    <p className="mb-3 text-xs text-gray-500" id="file_input_help">
                        PNG OR JPG (MAX. 800x400px).
                    </p>
                    {/* Upload Resume/CV*/}
                    <label
                        htmlFor="file_input"
                        className="block mb-1 text-sm font-medium text-gray-900"
                    >
                        Upload Resume/CV
                    </label>
                    <input
                        className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring focus:ring-blue-500"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                    />
                    <p className="mb-3 text-xs text-gray-500" id="file_input_help">
                        PDF (MAX. 20MB).
                    </p>
                </div>
                <div className="text-xs pb-2">
                    <p>Listing may take up to 24 to 48 hours to be approved by an admin before going public.</p>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-purple-950 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
                    Submit Form
                </button>
            </form>
        </div>
    )
}

export default ApplyPage