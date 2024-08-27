const express = require('express');
const router = express.Router();

const { alumini_post } = require('../controller/alumini_post');
const { alumini_profile } = require('../controller/alumini_profile');

// Route to handle achievemen   t posts
router.post('/achievement-posts', alumini_post);

// Route to handle alumni profile creation
router.post('/users', alumini_profile);

module.exports = router;
