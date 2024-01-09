const { fetchParks } = require("../models/parks.model");

exports.getParks = (request, response) => {
  fetchParks().then((parks) => {
    response.status(200).send({ parks });
  });
};
