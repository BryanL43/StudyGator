/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/10/2024
*
* File:: config.js
*
* Description:: This file ships the correct hostname. It ensures
*               that the backend behaves consistently in both
*               production and local testing.
*
**************************************************************/

let BASE_URL;

if (window.location.hostname === 'localhost') {
    BASE_URL = 'http://localhost:2000';
} else {
    BASE_URL = 'https://eclipsesakura.online';
}
export default BASE_URL;