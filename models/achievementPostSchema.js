const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
    commenterId: { type: mongoose.Schema.Types.ObjectId, required: true },
    commentText: { type: String, required: true },
    commentDate: { type: Date, default: Date.now }
});

// Define the Photo Schema (used in AchievementPostSchema)
const photoSchema = new mongoose.Schema({
    photoUrl: { type: String, required: true },
    caption: String
});

// Define the Media Schema (used in AchievementPostSchema)
const mediaSchema = new mongoose.Schema({
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, required: true }
});

// Define the Achievement Post Schema
const achievementPostSchema = new mongoose.Schema({
    alumnusId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Alumini_profile' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateAchieved: { type: Date, required: true },
    datePosted: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
    visibility: { type: String, enum: ['Public', 'Alumni Only', 'Private'], default: 'Public' },
    tags: [String],
    photos: [photoSchema],
    media: [mediaSchema]
});

// Create the AchievementPost model


module.exports = mongoose.model('AchievementPost', achievementPostSchema);