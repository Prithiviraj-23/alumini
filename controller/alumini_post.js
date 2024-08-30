const path = require('path');
console.log(path.resolve(__dirname, '../config/multerConfig'));

const {upload} = require('../config/muilterconfig'); // Note: There's a typo in 'muilterconfig'
const AchievementPost = require('../models/achievementPostSchema');

const alumini_post = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading images:', err);
      return res.status(400).send({ error: 'Error uploading images', details: err });
    }

    try {
      const photoUrls = req.files.map(file => {
        return { photoUrl: `/uploads/${file.filename}`, caption: '' }; 
      });

      const newPost = new AchievementPost({
        ...req.body,
        photos: photoUrls
      });

      await newPost.save();
      res.status(201).send({ message: 'Achievement post created successfully', post: newPost });
    } catch (err) {
      console.error('Error creating achievement post:', err);
      res.status(400).send({ error: 'Error creating achievement post', details: err });
    }
  });
};

module.exports = {
  alumini_post
};
