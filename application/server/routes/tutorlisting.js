const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');

router.get('/api/tutor-listings', async (req, res) => {
    try {
        const pool = await connectDB();
        const [results] = await pool.query(`
            SELECT 
                id, 
                sales_pitch, 
                description, 
                pricing, 
                image, 
                attached_video, 
                attached_file, 
                date_created 
            FROM TUTORLISTINGS;
        `);
        res.json(results);
    } catch (error) {
        console.error('Error fetching tutor listings:', error);
        res.status(500).json({ error: 'Database query error' });
    }
});

module.exports = router;
