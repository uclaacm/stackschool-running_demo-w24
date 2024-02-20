const Pool = require("pg").Pool;

// make sure theses credentials match your database!!!

const pool = new Pool({
    user: "postgres",
    password: "root",
    database: "sr_database",
    host: "localhost",
    port: 5432
})

module.exports = pool;