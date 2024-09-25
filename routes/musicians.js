const express = require("express");
const Musician = require("../models/Musician");
const Band = require("../models/Band");

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
route.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const findUser = await Musician.findByPk(userId);
    res.json(findUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// route.post("/", async (req, res, next) => {
//   try {
//     const updateData = req.body;
//     const createNewUser = await Musician.create(updateData);
//     res.json(createNewUser);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });
route.post("/", async (req, res, next) => {
  try {
    const { name, instrument, bandId } = req.body;

    // Ensure the bandId is provided
    if (!bandId) {
      return res.status(400).json({ error: "bandId is required" });
    }

    // Find the band by id
    const band = await Band.findByPk(bandId);
    if (!band) {
      return res.status(404).json({ error: "Band not found" });
    }

    // Create the musician instance
    const newMusician = await Musician.create({ name, instrument });

    // Set the bandId for the musician
    await newMusician.setBand(band); // associate the newMusician with the band 

    res.status(201).json(newMusician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
route.put("/:id", async (req, res, next) => {
  try {
    const updateData = req.body;
    const userId = req.params.id;
    const findUserById = await Musician.findByPk(userId);
    await findUserById.update(updateData);
    res.json(findUserById);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
route.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const findUserById = await Musician.findByPk(userId);
    await findUserById.destroy();
    const findAll = await Musician.findAll();
    res.json(findAll);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = route;
