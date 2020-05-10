const express = require("express");
const router = express.Router();
const Materials = require("../models/Materials");

// @route   GET api/materials/:id
// @desc    Get materials
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const materials = await Materials.find({ job: req.params.id });
    res.json(materials);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/materials/:id
// @desc    Get materials
// @access  Public
router.post("/:id", async (req, res) => {
  const { itemNumber, part, quantity } = req.body;
  try {
    const material = new Materials({
      itemNumber,
      part,
      quantity,
      job: req.params.id,
    });

    await material.save();
    res.status(200).send("Material added");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/materials/:id
// @desc    Update material
// @access  Public
router.put("/:id", async (req, res) => {
  const { itemNumber, part, quantity } = req.body;
  const materialFields = {};
  if (itemNumber) materialFields.itemNumber = itemNumber;
  if (part) materialFields.part = part;
  if (quantity) materialFields.quantity = quantity;

  try {
    let material = await Materials.findById(req.params.id);
    if (!material) return res.status(404).json({ msg: "Material not found" });
    material = await Materials.findByIdAndUpdate(
      req.params.id,
      { $set: materialFields },
      { new: true }
    );

    res.json(material);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
