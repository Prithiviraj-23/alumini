const bcrypt = require("bcrypt");
const Alumini_profile = require("../models/Alumini_profile_Schema");
const { uploadProfilePicture } = require("../config/muilterconfig"); // Correct import
const path = require("path");
const fs = require("fs");
// Controller to create a new alumni profile
const createAlumniProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      graduationYear,
      fieldOfStudy,
      currentJob,
      location,
      interests,
      DOB,
      Department,
      Bio,
      college,
    } = req.body;

    // Check if the email already exists
    const existingProfile = await Alumini_profile.findOne({ email });
    if (existingProfile) {
      return res
        .status(400)
        .json({ error: "Email already exists. Please use a different email." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new alumni profile
    const newProfile = new Alumini_profile({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Use the hashed password
      graduationYear,
      fieldOfStudy,
      currentJob,
      location,
      interests,
      DOB,
      Department,
      Bio,
      college,
    });

    // Save the profile to the database
    const savedProfile = await newProfile.save();

    res.status(201).json({
      message: "Alumni profile created successfully",
      profile: savedProfile,
    });
  } catch (error) {
    console.error("Error creating alumni profile:", error);
    res
      .status(500)
      .json({ error: "Error creating alumni profile", details: error });
  }
};

const uploadProfilePic = (req, res) => {
  uploadProfilePicture(req, res, async (err) => {
    if (err) {
      console.error("Error uploading profile picture:", err);
      return res.status(500).json({ error: "Error uploading profile picture" });
    }

    try {
      const { id } = req.params; // Get the alumni profile ID from params

      // Find the profile by ID and update the profile picture path
      const updatedProfile = await Alumini_profile.findByIdAndUpdate(
        id,
        { profilePicture: req.file.path }, // Update the profile picture path
        { new: true }
      );

      if (!updatedProfile) {
        return res.status(404).json({ error: "Alumni profile not found" });
      }

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        profile: updatedProfile,
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res
        .status(500)
        .json({ error: "Error uploading profile picture", details: error });
    }
  });
};

const updateAlumniProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email,
      password,
      graduationYear,
      fieldOfStudy,
      currentJob,
      location,
      interests,
      DOB,
      Department,
      Bio,
      college,
    } = req.body;

    // Find the alumni profile by ID
    const existingProfile = await Alumini_profile.findById(id);
    if (!existingProfile) {
      return res.status(404).json({ error: "Alumni profile not found" });
    }

    // Update email if provided
    if (email) {
      // Check if the new email is already in use
      const emailExists = await Alumini_profile.findOne({ email });
      if (emailExists && emailExists._id.toString() !== id) {
        return res.status(400).json({
          error: "Email already in use. Please use a different email.",
        });
      }
      existingProfile.email = email;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingProfile.password = hashedPassword;
    }

    // Update other non-required fields
    if (graduationYear) existingProfile.graduationYear = graduationYear;
    if (fieldOfStudy) existingProfile.fieldOfStudy = fieldOfStudy;
    if (currentJob) existingProfile.currentJob = currentJob;
    if (location) existingProfile.location = location;
    if (interests) existingProfile.interests = interests;
    if (DOB) existingProfile.DOB = DOB;
    if (Department) existingProfile.Department = Department;
    if (Bio) existingProfile.Bio = Bio;
    if (college) existingProfile.college = college;

    // Update the updatedAt timestamp
    existingProfile.updatedAt = Date.now();

    // Save the updated profile to the database
    const updatedProfile = await existingProfile.save();

    res.status(200).json({
      message: "Alumni profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating alumni profile:", error);
    res
      .status(500)
      .json({ error: "Error updating alumni profile", details: error });
  }
};

const getaluminidetail = async (req, res) => {
  try {
    const { id } = req.params; // Get the alumni profile ID from params

    // Find the profile by ID
    const profile = await Alumini_profile.findById(id);

    if (!profile) {
      return res.status(404).json({ error: "Alumni profile not found" });
    }

    // Read the profile picture file and convert it to base64
    let profilePictureBase64 = null;
    if (profile.profilePicture) {
      const filePath = path.join(
        __dirname,
        "../uploads/",
        path.basename(profile.profilePicture)
      ); // Adjust the path as necessary
      profilePictureBase64 = fs.readFileSync(filePath).toString("base64");
    }

    // Return the profile with the picture as a base64 string
    res.status(200).json({
      ...profile.toObject(), // Convert Mongoose document to plain JavaScript object
      profilePicture: profilePictureBase64, // Add the base64 image
    });
  } catch (error) {
    console.error("Error retrieving alumni profile:", error);
    res
      .status(500)
      .json({ error: "Error retrieving alumni profile", details: error });
  }
};

module.exports = {
  createAlumniProfile,
  uploadProfilePic,
  updateAlumniProfile,
  getaluminidetail,
};
