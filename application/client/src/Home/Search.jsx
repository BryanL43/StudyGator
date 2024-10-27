/**************************************************************
* Author(s): Kenneth Wen
* Last Updated: 10/26/2024
*
* File:: Search.jsx
*
* Description:: This file handles the searching via redirect. It also
*               renders the vertical prototype search bar.
*
**************************************************************/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Search = ({ initialSubject = '', initialSearchTerm = '' }) => {
    const navigate = useNavigate();
    const [subject, selectedSubject] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        selectedSubject(initialSubject);
        setSearchTerm(initialSearchTerm);
    }, [initialSubject, initialSearchTerm]);

    const handleSearch = async(e) => {
        e.preventDefault();
        navigate(`/results?selectedSubject=${subject}&searchTerm=${searchTerm}`);
    };

    return (
        <div className="flex justify-center mt-5">
            <form onSubmit={handleSearch} className="flex gap-2 items-center">
                <select 
                    value={subject} 
                    onChange={(e) => selectedSubject(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    <option value="">Select Subject</option>
                    <option value="math">Math</option>
                    <option value="science">Computer Science</option>
                    <option value="geology">Geology</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search items"
                    className="border border-gray-300 rounded px-2 py-1"
                    maxLength={100}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Search
                </button>
            </form>
        </div>
    );
};

export default Search;