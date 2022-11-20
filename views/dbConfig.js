require("dotenv").config();

const { Client } = require('pg');

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${"same1234"}@${process.env.DB_HOST}:${process.env.DB_PORT}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

});

client.connect()


module.exports = { client: client };