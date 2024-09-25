const express = require("express");
// const {Band} = require("../models/index");
// const {Musician} = require("../models/index");
const { Band, Musician } = require("../models");

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    const allBands = await Band.findAll({ include: Musician });
    res.json(allBands);
    console.log(JSON.stringify(allBands, null, 2));
  } catch (error) {
    console.error(error);
    next(error);
  }
});
route.get("/:id", async (req, res, next) => {
  try {
    const bandId = req.params.id;
    const findBand = await Band.findByPk(bandId);
    res.json(findBand);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
route.post("/", async (req, res, next) => {
  try {
    const updateData = req.body;
    const createNewBand = await Band.create(updateData);
    res.json(createNewBand);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
route.put("/:id", async (req, res, next) => {
  try {
    const updateData = req.body;
    const bandId = req.params.id;
    const findBandById = await Band.findByPk(ubandd);
    await findBandById.update(updateData);
    res.json(findBandById);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
route.delete("/:id", async (req, res, next) => {
  try {
    const bandId = req.params.id;
    const findBandById = await Band.findByPk(bandId);
    await findBandById.destroy();
    const findAll = await Band.findAll();
    res.json(findAll);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = route;
