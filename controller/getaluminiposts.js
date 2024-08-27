const fs = require('fs');
const path = require('path');
const AchievementPost = require('../models/achievementPostSchema');

// Controller to get achievement posts
const getposts = async (req, res) => {
    try {
        const { alumnusId } = req.query; // Retrieve alumnusId from query parameters

        // Fetch achievement posts from the database
        const posts = await AchievementPost.find(alumnusId ? { alumnusId } : {}) // If alumnusId is provided, filter by it
            .populate('alumnusId', 'name') // Populate the alumnusId to get the name
            .sort({ datePosted: -1 }); // Sort by date posted, most recent first

        // Convert photo URLs to base64 strings
        const postsWithImages = await Promise.all(posts.map(async (post) => {
            const photosWithBase64 = await Promise.all(post.photos.map(async (photo) => {
                const fileName = photo.photoUrl.split('/').pop(); // Get the file name from the URL
                const photoPath = path.join(__dirname, '../uploads', fileName); 
                console.log('Looking for image at:', photoPath); // Debugging output

                // Try to read the image file
                try {
                    const imageBuffer = fs.readFileSync(photoPath);
                    const base64Image = imageBuffer.toString('base64');
                    return {
                        photoUrl: `data:image/png;base64,${base64Image}`, // Change 'png' to the appropriate type if necessary
                        caption: photo.caption,
                        _id: photo._id
                    };
                } catch (fileError) {
                    console.error(`Error reading file ${photoPath}:`, fileError);
                    return {
                        photoUrl: 'data:image/png;base64,<default_base64_placeholder>', // Add your placeholder base64 string
                        caption: photo.caption,
                        _id: photo._id
                    };
                }
            }));

            // Create a new object excluding the alumnusId
            const { alumnusId, ...postWithoutAlumnusId } = post.toObject();
            return {
                ...postWithoutAlumnusId,
                photos: photosWithBase64 // Replace the original photo URLs with base64 strings
            };
        }));

        // Send the posts as a response
        res.status(200).json(postsWithImages);
    } catch (err) {
        console.error('Error fetching achievement posts:', err);
        res.status(500).json({ error: 'Error fetching achievement posts', details: err });
    }
};

module.exports = {
    getposts
};
