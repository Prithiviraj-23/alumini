const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
} = require("../controller/event");

// Route to handle achievement posts

router.post("/events", createEvent);

// Get all events
router.get("/allevents/:id", getAllEvents);

// Get an event by ID

// Update an event by ID
router.put("/events/:id", updateEventById);

// Delete an event by ID
router.delete("/events/:id", deleteEventById);

module.exports = router;
