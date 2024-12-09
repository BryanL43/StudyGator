/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/5/2024
*
* File:: useMediaQuery.js
*
* Description:: This function acquires the type of device the user is using.
*
**************************************************************/

import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const listener = () => setMatches(mediaQueryList.matches);

        mediaQueryList.addListener(listener);
        return () => mediaQueryList.removeListener(listener);
    }, [query]);

    return matches;
};

export default useMediaQuery;