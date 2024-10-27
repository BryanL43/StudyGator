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
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../utils/config';

const Search = ({ initialSubject = '', initialSearchTerm = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [subject, selectedSubject] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [subjectList, setSubjectList] = useState([]);

    // Extract query information from URL
    const queryParams = new URLSearchParams(location.search);
    const urlSelectedSubject = queryParams.get('selectedSubject') || '';
    const urlSearchTerm = queryParams.get('searchTerm') || '';

    useEffect(() => {
        selectedSubject(initialSubject);
        setSearchTerm(initialSearchTerm);
    }, [initialSubject, initialSearchTerm]);

    // Load search bar drop down subjects
    const fetchSubjects = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/subject`);
            setSubjectList(response.data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    }

    // Render subject drop down on mount
    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleSearch = async(e) => {
        e.preventDefault();
        console.log(urlSelectedSubject, urlSearchTerm);
        if (urlSelectedSubject === subject && urlSearchTerm === searchTerm) {
            window.location.reload();
        } else {
            navigate(`/results?selectedSubject=${subject}&searchTerm=${searchTerm}`);
        }
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
                    {subjectList.map((subjectItem) => (
                        <option key={subjectItem.id} value={subjectItem.name}>
                            {subjectItem.name}
                        </option>
                    ))}
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