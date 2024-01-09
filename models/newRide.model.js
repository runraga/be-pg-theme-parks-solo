const db = require("../db/connection")

exports.addNewRide = (body, park_id) => {
    return db.query(`INSERT INTO rides 
    (ride_name, year_opened)
    VALUES 
    ($1, $2)
    RETURNING *`,
    [body.ride_name, body.year_opened])
    .then(({ rows }) => {
        rows[0].park_id = Number(park_id)
        return rows[0];
    })
}