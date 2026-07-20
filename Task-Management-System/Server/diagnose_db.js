require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false }
    });

    console.log("Connected to Aiven!");

    try {
        const [dbs] = await connection.query("SHOW DATABASES");
        console.log("Databases:");
        console.table(dbs);

        await connection.query("USE defaultdb");
        const [tablesDefault] = await connection.query("SHOW TABLES");
        console.log("Tables in 'defaultdb':");
        console.table(tablesDefault);

        await connection.query("USE mysql2");
        const [tablesMysql2] = await connection.query("SHOW TABLES");
        console.log("Tables in 'mysql2':");
        console.table(tablesMysql2);
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        await connection.end();
    }
}

checkDB();
