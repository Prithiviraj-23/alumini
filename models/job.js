const mongoose = require('mongoose');

// Define the Job Posting Schema
const jobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },               
  description: { type: String, required: true },          
  company: { type: String, required: true },              
  location: { type: String, required: true },            
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumini_profile', required: true },
  datePosted: { type: Date, default: Date.now },          
  isActive: { type: Boolean, default: true },            
  interviewType: { type: String, enum: ['Onsite', 'Remote'], required: true } 
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
