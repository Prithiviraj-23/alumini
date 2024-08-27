const express = require('express');
const router = express.Router();
const { scrapeNews } = require('../controller/news_feed');

// Define the route for fetching news feed
router.get('/news-feed', scrapeNews);

module.exports = router;
