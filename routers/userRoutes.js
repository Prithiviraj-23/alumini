const express = require('express');
const router = express.Router();

const { alumini_post } = require('../controller/alumini_post');
const { alumini_profile } = require('../controller/alumini_profile');
const {getposts}=require('../controller/getaluminiposts')

// Route to handle achievement posts
router.post('/achievement-posts', alumini_post);

// Route to handle alumni profile creation
router.post('/users', alumini_profile);


router.get('/alumni/exclude/:id',getposts);


module.exports = router;
