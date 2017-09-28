/**
 * Created by maiquel on 20/09/17.
 */
"use strict";
const pg = require('pg');

/* #### Configure POSTGRES #### */
const config = {
    user: 'admin',
    database: 'default',
    password: 'admin',
    host: '192.168.99.100',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

function executeQuery(query) {
    let res = null;
    try {
        res = pool.query(query);
    } catch (err) {
        console.error('Error running query: ', err);
    }
    return res;
}

//Cria tabela inicial
const initQuery = 'CREATE TABLE todos ("text" varchar NULL)';
executeQuery(initQuery)
    .then(() => {
        console.log('Criada tabela "todos" no Postgres');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = executeQuery;
