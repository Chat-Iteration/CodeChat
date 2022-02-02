const { Pool } = require('pg');

const PG_URI = 'postgres://jtrdwenk:ayxPG0obTu8ZEyyDsdPypGjmDIe9N5YB@kashin.db.elephantsql.com/jtrdwenk';

const pool = new Pool({
    connectionString: PG_URI
})

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
}