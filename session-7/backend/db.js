const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "",
    database: "sr_database",
    host: "localhost",
    port: 5433
})

module.exports = pool;