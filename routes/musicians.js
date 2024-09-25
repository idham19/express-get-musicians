const express = require("express");
const Musician = require("../models/Musician");

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
route.post("/", async (req, res, next) => {
  try {
    const updateData = req.body;
    const createNewUser = await Musician.create(updateData);
    res.json(createNewUser);
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




module.exports=route