const mongoose = require('mongoose');

const Alumini_profile_Schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    graduationYear: Number,
    fieldOfStudy: String,
    currentJob: String,
    location: String,
    interests: [String],
    profilePicture: String,
    DOB: Date,
    Department: String,
    college: String,
    donationHistory: [
      {
        amount: Number,
        date: Date,
        project: String
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Alumini_profile', Alumini_profile_Schema);
