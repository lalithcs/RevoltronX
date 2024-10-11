// index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');
const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

const PORT = 5000;
const API_KEY = process.env.NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

app.use(cors());

app.get('/api/news', async (req, res) => {
  const cachedData = cache.get("newsData");
  
  if (cachedData) {
    return res.json(cachedData);
  }
  
  try {
    const response = await axios.get(API_URL);
    cache.set("newsData", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news headlines." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
