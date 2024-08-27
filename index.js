const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbconnect=require("./config/db.config")// Initialize Express
const app = express();
const userRoutes=require('./routers/userRoutes')
const newsFeedRoutes = require('./routers/news_feed_Routes');


app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
app.use('/api', userRoutes);

app.use('/api', newsFeedRoutes);
dbconnect();
// Define a route to create a new user


app.post('/users', );




// Define a GET route to retrieve all alumni except the one with the specified ID
app.get('/alumni/exclude/:id', async (req, res) => {
    try {
      const excludedId = req.params.id;
      
      // Validate the ObjectId
      if (!mongoose.Types.ObjectId.isValid(excludedId)) {
        return res.status(400).send({ error: 'Invalid ID format' });
      }
  
      const alumni = await AchievementPost.find({ alumnusId: { $ne: excludedId } });
      res.status(200).send(alumni);
    } catch (err) {
      console.error('Error retrieving alumni:', err);
      res.status(500).send({ error: 'Error retrieving alumni', details: err.toString() });
    }
  });
  
  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
