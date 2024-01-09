const express = require("express");
const app = express();

const { getParks } = require("./controllers/parks.controller");
const { getSingleRide, deleteRide } = require("./controllers/rides.controller");
const { newRide } = require("./controllers/newRide.controller");
const { updatedRide } = require("./controllers/updatedRide.controller");

app.use(express.json());

app.get("/api/healthcheck", (request, response) => {
  response.status(200).send();
});

app.get("/api/parks", getParks);
app.get("/api/ride/:ride_id", getSingleRide);

app.post("/api/parks/:park_id/rides", newRide);

app.patch("/api/rides/:ride_id", updatedRide);

app.delete("/api/rides/:ride_id", deleteRide);

module.exports = app;
