const db = require("../db/connection");

exports.fetchRide = (ride_id) => {
  return db
    .query(
      `SELECT ride_id, ride_name, rides.year_opened, park_name,votes FROM rides 
    JOIN parks
    ON rides.park_id = parks.park_id
    WHERE ride_id = $1`,
      [ride_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
