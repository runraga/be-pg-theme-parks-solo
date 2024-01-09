const { fetchParks, fetchParkInfo } = require("../models/parks.model");

exports.getParks = (request, response) => {
  fetchParks().then((parks) => {
    response.status(200).send({ parks });
  });
};
exports.getPark = (request, response) => {
  const { park_id } = request.params;
  fetchParkInfo(park_id).then((park) => {
    console.log(park, "<<<<");
    response.status(200).send({ park });
  });
};
