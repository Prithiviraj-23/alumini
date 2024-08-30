const jobPostingSchema = require('../models/job');

const createJobPosting = async (req, res) => {
    try {
        const { title, description, company, location, postedBy, interviewType,isActive } = req.body;

        // Validate the postedBy field
        if (!postedBy) {
            return res.status(400).json({ error: 'postedBy is required' });
        }

        // Create a new job posting instance
        const newJobPosting = new jobPostingSchema({
            title,
            description,
            company,
            location,
            postedBy,
            interviewType,
            isActive // Include interviewType in the new job posting
        });

        await newJobPosting.save();

        // Send a success response
        res.status(201).json({ message: 'Job posting created successfully', jobPosting: newJobPosting });
    } catch (err) {
        console.error('Error creating job posting:', err);
        res.status(500).json({ error: 'Error creating job posting', details: err });
    }
};

module.exports = {
    createJobPosting
};
