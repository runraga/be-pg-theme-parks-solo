const db = require("../db/connection");

exports.updatedRideData = (body, ride_id) => {
    console.log(ride_id)
    return db.query(`UPDATE rides
    SET ride_name = $1
    WHERE ride_id = $2
    RETURNING *`, 
    [body.ride_name, ride_id])
    .then(({ rows }) => {
        return rows[0]
    })
}