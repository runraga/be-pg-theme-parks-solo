const { fetchRide, deleteRideFromDb } = require("../models/rides.model");

exports.getSingleRide = (request, response) => {
  const { ride_id } = request.params;
  fetchRide(ride_id).then((ride) => {
    if (ride === undefined) {
      response.status(404).send();
    } else {
      response.status(200).send({ ride });
    }
  });
};
exports.deleteRide = (request, response) => {
  const { ride_id } = request.params;
  deleteRideFromDb(ride_id).then(() => {
    response.status(204).send();
  });
};
