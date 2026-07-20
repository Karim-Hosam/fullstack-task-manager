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

const dbHost = process.env.DB_HOST || 'localhost';

// Use a connection pool instead of a single connection.
// A pool handles disconnects, DNS failures, and reconnection automatically
// without emitting unhandled 'error' events that crash the process.
const pool = mysql.createPool({
    host: dbHost,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mysql2',
    port: process.env.DB_PORT || 3306,
    ssl: sslConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});

// Verify connectivity at startup (non-fatal — the server keeps running either way)
pool.getConnection((err, connection) => {
    const target = dbHost === 'localhost' ? 'local database (localhost)' : `remote database (${dbHost})`;
    if (err) {
        console.error(`⚠️  Database connection failed at startup — target: ${target}`);
        console.error('   Error:', err.message);
        console.error('   The server will keep running and retry on each request.');
    } else {
        console.log(`✅ Database connected successfully — target: ${target}`);
        console.log('DB_SSL_CA present:', !!process.env.DB_SSL_CA, '| length:', process.env.DB_SSL_CA ? process.env.DB_SSL_CA.length : 0);
        console.log('DB_SSL:', process.env.DB_SSL);
        connection.release();
    }
});

module.exports = pool;