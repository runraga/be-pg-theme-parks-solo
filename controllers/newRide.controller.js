const { response } = require("../app")
const { addNewRide } = require("../models/newRide.model")

exports.newRide = (request, response) => {
    const newRideData = request.body;
    const { park_id } = request.params;
    addNewRide(newRideData, park_id).then((ride) => {
        response.status(201).send({ ride })
    })
}