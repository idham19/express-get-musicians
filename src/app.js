const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3004;
app.use(express.json());
app.use(express.urlencoded());
//TODO: Create a GET /musicians route to return all musicians
db.sync()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting Database", err);
  });

app.get("/musicians", async (request, response) => {
  try {
    const musician = await Musician.findAll();
    response.json(musician);
  } catch (err) {
    console.error("Error fetching Musicians", err);
  }
});

app.get("/musicians/:id", async (req, res) => {
  const musicianId = req.params.id;
  const findMusician = await Musician.findByPk(musicianId);
  res.json(findMusician);
});

app.post("/musicians", async (req, res) => {
  const updateData = req.body;
  const newMusician = await Musician.create(updateData);
  const allMusicans = await Musician.findAll();
  res.status(201).json(newMusician);
});

app.put("/musicians/:id", async (req, res, next) => {
  try {
    const musicianId = req.params.id;
    const updateDate = req.body;
    const findMusician = await Musician.findByPk(musicianId);
    await findMusician.update(updateDate);
    res.json(findMusician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//Delete Method
app.delete("/musicians/:id", async (req, res, next) => {
  try {
    const muscianId = req.params.id;
    const findMusician = await Musician.findByPk(muscianId);
    await findMusician.destroy();
  } catch (error) {
    console.error(error);
    next(error);
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
module.exports = app;
