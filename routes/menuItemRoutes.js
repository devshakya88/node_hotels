const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem'); // Update path as needed

router.post("/", async (req, res) => {
    try {
        const menu = req.body;
        const newMenuItem = new MenuItem(menu);
        const response = await newMenuItem.save();
        res.status(200).json(response);
        console.log("Data Saved");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const menu = await MenuItem.find();
        res.status(200).json(menu);
        console.log("Data Fetched Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:taste', async(req, res) => {
    const taste = req.params.taste;
    try {
        if (["sour", "sweet", "spicy"].includes(taste)) {
            const response = await MenuItem.find({ taste: taste });
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid Taste Type" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
