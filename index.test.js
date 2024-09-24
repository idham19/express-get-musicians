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

  //Get method using Id test
  test("getting musicians by Id", async () => {
    const musicianId = 1;
    const findMusician = await request(app).get(`/musicians/${musicianId}`);
    expect(findMusician.statusCode).toBe(200);
    expect(findMusician.body.name).toEqual(seedMusician[0].name);
  });

  //Post Method test
  test("Post New Musician", async () => {
    const updateData = {
      name: "jo",
      intrument: "guitar",
    };
    const newMusician = await request(app).post("/musicians").send(updateData);
    expect(newMusician.statusCode).toBe(201);
    expect(newMusician.body.name).toEqual(updateData.name);
  });

  //Put Method test
  test("update musician", async () => {
    const updateData = {
      name: "lora",
      instrument: "voice",
    };
    const musicianId = 1;
    const findMusician = await request(app)
      .put(`/musicians/${musicianId}`)
      .send(updateData);
    expect(findMusician.statusCode).toBe(200);
    expect(findMusician.body.name).toBe(updateData.name);
    expect(findMusician.body.instrument).toBe(updateData.instrument);
  });

  test("should delete a musician", async () => {
    // Create a musician first (assuming you have a POST endpoint for that)
    const createdMusician = await request(app)
      .post("/musicians")
      .send({ name: "John Doe", instrument: "Guitar" })
      .expect(201)
      .then((res) => res.body);

    // Delete the newly created musician
    const response = await request(app)
      .delete(`/musicians/${createdMusician.id}`)
      .expect(200);

    // Assertions
    expect(response.body.message).toBe("Musician deleted successfully");
  });
});
