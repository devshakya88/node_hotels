const express = require("express");
const router = express.Router();
const Person = require("../models/person"); // Update path as needed

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        res.status(200).json(response);
        console.log("Data Saved");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
        console.log("Data Fetched Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:workType", async (req, res) => {
    const workType = req.params.workType;
    try {
        if (["chef", "manager", "waiter"].includes(workType)) {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid Work Type" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:person_id", async (req, res) => {
    try {
        const personID = req.params.person_id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personID, updatedPersonData, { new: true, runValidators: true });
        if (!response) {
            res.status(404).json({ error: "Person Not Found" });
        } else {
            res.status(200).json(response);
            console.log("Data Updated");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:person_id", async (req, res) => {
    try {
        const personID = req.params.person_id;
        const response = await Person.findByIdAndDelete(personID);
        if (!response) {
            res.status(404).json({ error: "Person Not Found" });
        } else {
            res.status(200).json({ message: "Person Deleted Successfully" });
            console.log("Data Deleted");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
