const express = require("express");
const router = express.Router();
const Jobs = require("../models/Jobs");
const mongoose = require("mongoose");

// @route   POST api/jobs
// @desc    Adding a new job
// @access  Public
router.post("/", async (req, res) => {
  const {
    problem,
    customer,
    contactPerson,
    responPerson,
    otherReference,
    completed,
    date,
    _id,
  } = req.body;

  const startDate = new Date();
  let endDate = new Date(date);

  const duration = endDate.getTime() - startDate.getTime();
  console.log(duration);
  try {
    const jobs = new Jobs({
      problem,
      customer,
      contactPerson,
      responPerson,
      otherReference,
      completed,
      date,
      duration,
      _id,
    });

    await jobs.save();
    res.status(200).send("Job Added");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// @route   GET api/jobs/inProcess
// @desc    Get jobs that are in process
// @access  Public
router.get("/inProcess", async (req, res) => {
  try {
    const jobs = await Jobs.find({ completed: false });
    res.json(jobs);
  } catch (err) {
    console.log({ data: jobs });
    res.status(500).send("Server Error");
  }
});

// @route   GET api/jobs/completed
// @desc    Get jobs that are completed
// @access  Public
router.get("/completed", async (req, res) => {
  try {
    const jobs = await Jobs.find({ completed: true });
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/jobs/:id
// @desc    Update job state
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    let job = await Jobs.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    job = await Jobs.findByIdAndUpdate(
      { _id: req.params.id },
      { completed: true }
    );
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
