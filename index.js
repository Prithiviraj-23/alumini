const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbconnect=require("./config/db.config")
const app = express();
const userRoutes=require('./routers/userRoutes')
const newsFeedRoutes = require('./routers/news_feed_Routes');



dbconnect();

app.use(bodyParser.json()); // Middleware to parse JSON request bodies


app.use('/api', userRoutes);

app.use('/api', newsFeedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
