/* import mysql from 'mysql2/promise';

const mySqlPool = mysql.createPool({
    host : 'localhost',
    user :'onenantsoa',
    password : '00000000',
    database : 'recrutements'   
});

export default mySqlPool; */

import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    host : 'localhost',
    user : 'postgres',
    password : '00000000',
    database : 'recrutements',
    port : 5432
})

export default pool;