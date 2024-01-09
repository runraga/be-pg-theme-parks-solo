const { updatedRideData } = require("../models/updatedRide.model")

exports.updatedRide = (request, response) => {
    const bodyData = request.body;
    const { ride_id } = request.params;
    updatedRideData(bodyData, ride_id)
    .then((ride) => {
        console.log(ride)
        response.status(200).send({ ride })
    })
    .catch((error) => {
        console.log(error)
        return error
    })
}