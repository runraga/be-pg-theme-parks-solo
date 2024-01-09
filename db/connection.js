
// TODO:
// Install node-postgres. /
// Create a new connection pool in the db/connection.js file. /
// Export the connection pool so that it is available for use in other files./

const { Pool } = require('pg');

if (process.env.PGDATABASE === undefined) {
    throw new Error('no pgdatabase set');
}

const pool = new Pool();


module.exports = pool