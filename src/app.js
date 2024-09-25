const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const musicianRouter = require("../routes/musicians");
const bandRouter = require("../routes/band");

app.use(express.json());
app.use("/musicians", musicianRouter);
app.use("/bands", bandRouter);
// app.use(express.urlencoded());

//TODO: Create a GET /musicians route to
module.exports = app;
