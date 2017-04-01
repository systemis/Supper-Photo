const pg     = require('pg');
const config = {
    host: "localhost",
    port: 5432,
    user: 'postgres',
    database: 'SupperPhoto',
    max: 1000,
    idleTimeoutMillis: 30000
}
const pool =  new pg.Pool(config);
module.exports = pool;