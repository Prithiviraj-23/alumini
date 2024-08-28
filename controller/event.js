const Event = require("../models/event");
const Alumini_profile = require("../models/Alumini_profile_Schema");

const mongoose = require("mongoose");

// Controller to create a new event
const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    console.log(newEvent);
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Error creating event", details: err });
  }
};

// Controller to get all events, excluding those created by a specific ID
const getAllEvents = async (req, res) => {
  try {
    const { id: excludeId } = req.params; // Use the id as excludeId
    if (excludeId && !mongoose.isValidObjectId(excludeId)) {
      return res.status(400).json({ error: "Invalid excludeId" });
    }

    const query = excludeId ? { createdBy: { $ne: excludeId } } : {};

    const events = await Event.find(query).populate(
      "createdBy",
      "firstName lastName"
    );

    console.log("event");

    // Create a modified response to include the creator's full name
    const formattedEvents = events.map((event) => ({
      _id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      register_link: event.register_link,
      createdBy: `${event.createdBy.firstName} ${event.createdBy.lastName}`, // Combining first and last name
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }));

    res.status(200).json(formattedEvents);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Error fetching events", details: err });
  }
};



// Controller to update an event by ID, excluding those created by a specific ID
const updateEventById = async (req, res) => {
  try {
    const { id } = req.params; // Use the id as event ID or excludeId
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Error updating event", details: err });
  }
};

// Controller to delete an event by ID, excluding those created by a specific ID
const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params; // Use the id as event ID or excludeId
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Error deleting event", details: err });
  }
};



// // Controller to get an event by ID, excluding those created by a specific ID
// const getEventById = async (req, res) => {
//   try {
//     const { id } = req.params; // Use the id as event ID or excludeId
//     const event = await Event.findOne({ _id: id }).populate(
//       "createdBy",
//       "firstName lastName"
//     );

//     if (!event) {
//       return res.status(404).json({ error: "Event not found" });
//     }

//     res.status(200).json(event);
//   } catch (err) {
//     console.error("Error fetching event:", err);
//     res.status(500).json({ error: "Error fetching event", details: err });
//   }
// };

module.exports = {
  createEvent,
  getAllEvents,
 // getEventById,
  updateEventById,
  deleteEventById,
};
