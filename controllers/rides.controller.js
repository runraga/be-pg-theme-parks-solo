const { fetchRide } = require("../models/rides.model");

exports.getSingleRide = (request, response) => {
  const { ride_id } = request.params;
  fetchRide(ride_id).then((ride) => {
    response.status(200).send({ ride });
  });
};
