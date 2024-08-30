const mongoose = require("mongoose");
const Alumini_profile = require("./Alumini_profile_Schema");
const DonationSchema = new mongoose.Schema({
  alumnusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumini_profile",
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  project: { type: String, default: "General Donation" },
  message: { type: String, default: "" }, // Optional message from the donor
});

module.exports = mongoose.model("Donation", DonationSchema);
