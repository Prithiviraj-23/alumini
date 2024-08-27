const AchievementPost=require('../models/achievementPostSchema')

const alumini_post=async (req, res) => {
    try {
      const newPost = new AchievementPost(req.body);
      await newPost.save();
      res.status(201).send({ message: 'Achievement post created successfully', post: newPost });
    } catch (err) {
      console.error('Error creating achievement post:', err);
      res.status(400).send({ error: 'Error creating achievement post', details: err });
    }
  };

  module.exports = {
    alumini_post
};

  
