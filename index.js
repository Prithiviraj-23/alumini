const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbconnect=require("./config/db.config")
const app = express();
const userRoutes=require('./routers/userRoutes')
const newsFeedRoutes = require('./routers/news_feed_Routes');
const cors = require('cors');


dbconnect();

app.use(bodyParser.json()); // Middleware to parse JSON request bodies
// Use CORS middleware
app.use(cors({
  origin: '*', // Allow all origins (for development purposes)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use('/api', userRoutes);

app.use('/api', newsFeedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
