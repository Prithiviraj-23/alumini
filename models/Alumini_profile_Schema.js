const mongoose = require("mongoose");

const Alumini_profile_Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, default: "welcome" },
  graduationYear: { type: Number, default: null },
  fieldOfStudy: { type: String, default: "Not Specified" },
  currentJob: { type: String, default: "Not Specified" },
  location: { type: String, default: "Not Specified" },
  interests: { type: [String], default: [] },
  profilePicture: { type: String, default: "" }, // Empty string for default
  DOB: { type: Date, default: null },
  Department: { type: String, default: "Not Specified" },
  Bio: { type: String, default: "No bio available" },
  college: { type: String, default: "Not Specified" },
  donationHistory: {
    type: [
      {
        amount: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
        project: { type: String, default: "General Donation" },
      },
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alumini_profile", Alumini_profile_Schema);
