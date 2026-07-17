const mysql = require("mysql2");

// Configure SSL if a CA certificate is provided
const sslConfig = process.env.DB_SSL_CA ? {
    ca: process.env.DB_SSL_CA
} : undefined;

const Connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mysql2',
    port: process.env.DB_PORT || 3306,
    ssl: sslConfig
});

module.exports = Connection;