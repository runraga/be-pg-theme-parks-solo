const db = require("../db/connection");

exports.fetchParks = () => {
  return db.query("SELECT * FROM parks").then(({ rows }) => {
    return rows;
  });
};
