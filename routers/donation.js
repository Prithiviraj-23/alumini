const express = require("express");
const router = express.Router();
const { donate } = require("../controller/donationcontroller");

// POST endpoint for making a donation
router.post("/donate", donate);

module.exports = router;
