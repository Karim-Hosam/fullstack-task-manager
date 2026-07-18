const mysql = require("mysql2");

// Configure SSL: full CA verification if DB_SSL_CA is set (e.g. Render),
// or basic encrypted connection without CA pinning if DB_SSL=true (e.g. Back4app,
// where the CA text is too long for their environment variable limit)
let sslConfig;
if (process.env.DB_SSL_CA) {
    sslConfig = { ca: process.env.DB_SSL_CA };
} else if (process.env.DB_SSL === 'true') {
    sslConfig = { rejectUnauthorized: false };
} else {
    sslConfig = undefined;
}

const Connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mysql2',
    port: process.env.DB_PORT || 3306,
    ssl: sslConfig
});

module.exports = Connection;