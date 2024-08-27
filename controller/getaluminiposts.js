const mongoose =require('mongoose')
const AchievementPost =require('../models/achievementPostSchema')


const getposts= async (req, res) => {
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
  }

module.exports ={getposts};