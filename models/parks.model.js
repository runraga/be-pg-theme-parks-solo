const db = require("../db/connection");

exports.fetchParks = () => {
  return db.query("SELECT * FROM parks").then(({ rows }) => {
    return rows;
  });
};
exports.fetchParkInfo = (park_id) => {
  //get park
  //get park name
  //get rides
  return db
    .query(`SELECT * FROM parks WHERE park_id = $1`, [park_id])
    .then(({ rows }) => {
      const selectRides = db.query(
        `SELECT park_id, ROUND(AVG(votes),2) AS average_votes, COUNT(*) AS ride_count
        FROM rides 
        WHERE park_id = $1
        GROUP BY park_id;`,
        [park_id]
      );
      return Promise.all([selectRides, rows[0]]);
    })
    .then(([{ rows }, parkInfo]) => {
      
      const { average_votes, ride_count } = rows[0];
      parkInfo.average_votes = Number(average_votes);
      parkInfo.ride_count = Number(ride_count);
      console.log(parkInfo);
      return parkInfo;
    });
};
