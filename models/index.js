const Band = require("./Band");
const Musician = require("./Musician");
Band.hasMany(Musician, { foreignKey: 'bandId' });
Musician.belongsTo(Band, { foreignKey: 'bandId' });



module.exports = {
  Band,
  Musician,
};
