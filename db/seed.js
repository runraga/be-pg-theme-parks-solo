const db = require("./connection");
const themeParks = require("./data/parks");
const themeRides = require("./data/rides");
const formatRideData = require("./utils");

const format = require("pg-format");

function seed() {
  return (
    db
      .query("DROP TABLE IF EXISTS rides;")
      // .then(() => {
      //   return db.query("DROP TABLE IF EXISTS stalls;");
      // })
      // .then(() => {
      //   return db.query("DROP TABLE IF EXISTS foods;");
      // })
      // .then(() => {
      //   return db.query("DROP TABLE IF EXISTS stalls_foods;");
      // })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS parks;");
      })
      .then(() => {
        return createParks();
      })
      .then(() => {
        return createRides();
      })
      .then(() => {
        return parkData();
      })
      .then((results) => {
        const formattedRideInfo = formatRideData(themeRides, results.rows);
        return ridesData(formattedRideInfo);
      })
  );
  // .then(() => {
  //   return parkFood();
  // })
  // .then(() => {
  //   return parkStalls();
  // })
  // .then(() => {
  //   return foodStalls();
  // })
}

function createParks() {
  return db.query(`CREATE TABLE parks (
    park_id SERIAL PRIMARY KEY,
    park_name VARCHAR(40) NOT NULL,
    year_opened INT NOT NULL,
    annual_attendance INT NOT NULL
  )`);
}

function createRides() {
  return db.query(`CREATE TABLE rides (
    ride_id SERIAL PRIMARY KEY,
    park_id INT REFERENCES parks(park_id),
    ride_name VARCHAR(40),
    year_opened INT NOT NULL,
    votes INT DEFAULT 0
  )`);
}

function parkData() {
  const sql = format(
    `INSERT INTO parks
    (park_name, year_opened, annual_attendance)
    VALUES
    %L
    RETURNING *`,
    themeParks.map((park) => [
      park.park_name,
      park.year_opened,
      park.annual_attendance,
    ])
  );
  return db.query(sql);
}

function ridesData(formattedRideInfo) {
  const sql = format(
    `INSERT INTO rides
    (park_id, ride_name, year_opened, votes)
    VALUES
    %L
    RETURNING *`,
    formattedRideInfo.map((ride) => {
      return [ride.park_id, ride.ride_name, ride.year_opened, ride.votes];
    })
  );
  return db.query(sql);
}

// function parkFood() {
//   return db.query(`CREATE TABLE food (
//     food_id SERIAL PRIMARY KEY,
//     food_name VARCHAR(40),
//     vegan_option BOOLEAN
//   )`);
// }

// function parkStalls() {
//   return db.query(`CREATE TABLE stalls (
//     stall_id SERIAL PRIMARY KEY,
//     stall_name VARCHAR(40),
//     park_id INT REFERENCES parks(park_id),
//   )`);
// }

// function foodStalls() {
//   return db.query(`CREATE TABLE foods_stalls (
//     foods_stall_id SERIAL PRIMARY KEY,
//     stalls_id INT REFERENCES stalls(stalls_id),
//     food_id INT REFERENCES food(food_id),
//   )`);}

module.exports = seed;

//TODO:
//First, let's create tables that do not reference other tables - called parks. /
//create rides table with parks_id /
//insert raw data into parks (INSERT, pg-format, arguments for format, utility function build[map])
//insert rides data (return park_id, match park_id with park_name, then insert rides data)

//advanced TODO:
// food and store
//prevent dupes
//3 tables!
