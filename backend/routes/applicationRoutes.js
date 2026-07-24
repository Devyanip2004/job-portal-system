const express = require("express");
const router = express.Router();
const Application = require("../models/application");

// Submit Application
router.post("/", async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();

        res.status(201).json({
            message: "Application Submitted Successfully",
            application
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get All Applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("job")
            .populate("applicant");

        res.json(applications);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;