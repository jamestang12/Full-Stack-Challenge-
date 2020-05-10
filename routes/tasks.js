const express = require("express");
const router = express.Router();
const Tasks = require("../models/Tasks");

// @route   POST api/tasks/:id
// @desc    Adding a new task
// @access  Public
router.post("/:id", async (req, res) => {
  const { jobNumber, SerialNumber, instructment } = req.body;

  try {
    const task = new Tasks({
      jobNumber,
      SerialNumber,
      instructment,
      job: req.params.id,
    });

    await task.save();
    res.status(200).send("Task Added");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// @route   GET api/tasks
// @desc    Get tasks
// @access  Public
router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
