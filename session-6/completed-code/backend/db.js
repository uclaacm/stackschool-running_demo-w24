const Pool = require("pg").Pool;

// make sure theses credentials match your database!!!
// to change the user password, run the following command in your SQL terminal:
// ALTER USER user_name WITH PASSWORD 'new_password';

const pool = new Pool({
  user: "postgres",
  password: "root",
  database: "sr_database",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
