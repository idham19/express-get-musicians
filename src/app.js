const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3004;
app.use(express.json());
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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
module.exports = app;
