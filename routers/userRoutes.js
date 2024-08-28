const express = require("express");
const router = express.Router();

const { alumini_post } = require("../controller/alumini_post");
const {
  createAlumniProfile,
  uploadProfilePic,
  updateAlumniProfile,
  getaluminidetail,
} = require("../controller/alumini_profile");
const { getposts } = require("../controller/getaluminiposts");
const { createJobPosting } = require("../controller/jobpost");
const { getJobPostingById } = require("../controller/jobgets");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
} = require("../controller/event");

// Route to handle achievement posts
router.post("/achievement-posts", alumini_post);

// Route to handle alumni profile creation
router.post("/users", createAlumniProfile);

router.get("/alumni/exclude/:id", getposts);

router.post("/jobpost", createJobPosting);

router.get("/jobgets/:id", getJobPostingById);

router.post("/profile/:id/upload", uploadProfilePic);

router.put("/updateprofile/:id", updateAlumniProfile);

router.get("/getalumini/:id", getaluminidetail);

module.exports = router;
