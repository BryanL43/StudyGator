import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const Search = ({setListings}) => {
    const [subject, selectedSubject] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/results?selectedSubject=${subject}&searchTerm=${searchTerm}`);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select value={subject} onChange={(e) => selectedSubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="geology">Geology</option>
            </select>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items"
            />

            <button type="submit">Search</button>
        </form>
    </div>
    );
};

export default Search;
