import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../utils/config';

const Home = () => {

    return (
        <div>
            <form action="/action_page.php">
                <input type="file" id="myFile" name="filename" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Home;
