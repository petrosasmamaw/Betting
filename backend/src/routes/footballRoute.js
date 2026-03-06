import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Proxy route to fetch matches from football-data.org to avoid CORS issues
router.get('/matches', async (req, res) => {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY;
    if (!apiKey) return res.status(500).json({ message: 'Football API key not configured' });

    const url = 'https://api.football-data.org/v4/matches';
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': apiKey,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('Football proxy error:', err);
    return res.status(502).json({ message: 'Proxy fetch failed', error: err.message });
  }
});

export default router;
