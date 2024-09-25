const app = require("./src/app");
const { db } = require("./db/connection");
const port = 3000;

app.listen(port, async () => {
  await db.sync({ alter: true }); // This will alter tables to match the models

  db.sync();
  console.log(`Listening at http://localhost:${port}/`);
});
