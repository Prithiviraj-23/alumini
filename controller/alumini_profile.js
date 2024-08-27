const Alumini_profile = require('../models/Alumini_profile_Schema');

const alumini_profile = async (req, res) => {
    console.log(req.body); // Log the incoming request body for debugging
    try {
        const newUser = new Alumini_profile(req.body);
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).send({ error: 'Error creating user', details: err });
    }
};

module.exports = { alumini_profile };
