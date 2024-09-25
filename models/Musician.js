const { Sequelize, db } = require("../db/connection");
const Band = require("./Band");

let Musician = db.define("musician", {
  name: Sequelize.STRING,
  instrument: Sequelize.STRING,
  bandId: {
    type: Sequelize.INTEGER,
    references: {
      model: Band, // Reference to the Band model
      key: "id", // Primary key in the Band model
    },
  },
});

module.exports = Musician;
