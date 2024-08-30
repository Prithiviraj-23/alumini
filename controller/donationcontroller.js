const Donation = require("../models/donation");

const donate = async (req, res) => {
  try {
    const { alumnusId, amount, project, message } = req.body;

    // Create a new donation record
    const newDonation = new Donation({
      alumnusId,
      amount,
      project,
      message,
    });

	console.log("ji")

    // Save the donation to the database
    await newDonation.save();

    res
      .status(201)
      .json({ message: "Donation made successfully", donation: newDonation });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Error creating donation", details: error });
  }
};

module.exports = {
  donate,
};
