// install dependencies
const { execSync } = require("child_process");
const app = require("./src/app");

execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here
  test("it's should respond with a status code 200", async () => {
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
  });

  test("Testing bakedGoods endpoint", async () => {
    // Sends request to `/bakedGoods` endpoint
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);
    // console.log(responseData[0].name);

    // Write expect tests here
    expect(responseData[0].name).toEqual(seedMusician[0].name);
  });

  test("getting musicians by Id", async () => {
    const musicianId = 1;
    const findMusician = await request(app).get(`/musicians/${musicianId}`);
    expect(findMusician.statusCode).toBe(200);
    expect(findMusician.body.name).toEqual(seedMusician[0].name);
  });

  test("Post New Musician", async () => {
    const updateData = {
      name: "jo",
      intrument: "guitar",
    };
    const newMusician = await request(app).post("/musicians").send(updateData);
    
    expect(newMusician.statusCode).toBe(201);
    expect(newMusician.body.name).toEqual(updateData.name);
  });
});
