// install dependencies
const { execSync } = require("child_process");
const app = require("./src/app");
const request = require("supertest");

execSync("npm install");
execSync("npm run seed");

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
      bandId:1
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
      .send({ name: "John Doe", instrument: "Guitar" ,bandId:3})
      .expect(201)
      .then((res) => res.body);

    // Delete the newly created musician
    const response = await request(app)
      .delete(`/musicians/${createdMusician.id}`)
      .expect(200);

    // Assertions
    // expect(response.body.message).toBe("Musician deleted successfully");
  });

 
  describe("bands end Points", () => {
    it("should create a new band and return the band data", async () => {
      const newBand = {
        name: "The Rolling Stones",
        genre: "Rock",
      };

      const response = await request(app)
        .post("/bands") // Make sure this matches your route
        .send(newBand)
        .expect(200); // Expecting a 201 Created status

      // Check that the response contains the correct data
      expect(response.body).toHaveProperty("id"); // Assuming ID is auto-generated
      expect(response.body.name).toBe(newBand.name);
      expect(response.body.genre).toBe(newBand.genre);
    });

    test("should create a new band and associate with a musicians one musician", async () => {
      const newBand = {
        name: "Nirvana",
        genre: "Grunge",
      };

      // Create the band
      const bandResponse = await request(app)
        .post("/bands")
        .send(newBand)
        .expect(200);

      // Create a musician associated with the new band
      const musician = {
        name: "Kurt Cobain",
        instrument: "Guitar",
        bandId: bandResponse.body.id, // Associate with the new band
      };

      await request(app).post("/musicians").send(musician).expect(201);
      // Fetch the band again to check associated musicians
      const updatedBandResponse = await request(app)
        .get(`/bands/${bandResponse.body.id}`) // Assuming you have a GET band by ID endpoint
        .expect(200); // Expecting a 200 OK status

      // Check that the musician is associated with the band
      expect(updatedBandResponse.body.musicians.length).toBe(1); // One musician should be associated
      expect(updatedBandResponse.body.musicians[0].name).toBe(musician.name);
    });
  });
});
