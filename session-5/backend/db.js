const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Password1234",
    database: "sr_database",
    host: "localhost",
    port: 5432
})

module.exports = pool;