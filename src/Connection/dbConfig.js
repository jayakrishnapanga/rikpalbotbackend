// const mysql = require('mysql2/promise');

// const connection = async () => {
//     try {
//         const dbConfig = {
//             host: process.env.MYSQL_Host,
//             user: process.env.MYSQL_User,
//             password: process.env.MYSQL_Password,
//             database: process.env.MYSQL_Schema_Name,
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0

//         };
//         const connection = await mysql.createConnection(dbConfig);
//         if (!connection) {
//             throw new Error("Database connection failed.");
//         } else {
//             console.log(connection)
//             return connection;
//         }
//     } catch (error) {
//         console.log("error in connection ",error)
//         return error;
//     }
// }

// module.exports = connection;


const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_Host,
    user: process.env.MYSQL_User,
    password: process.env.MYSQL_Password,
    database: process.env.MYSQL_Schema_Name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // Connection timeout in milliseconds
    acquireTimeout: 10000, // Timeout to get connection from pool
    timeout: 10000, // Timeout after which an idle connection is closed
    dateStrings: true // To avoid timezone issues
});

async function getConnection() {
    try {
        const connection = await pool.getConnection();
        if (!connection) {
            throw new Error("Failed to connect to database.");
        }
        return connection;
    } catch (error) {
        console.error("Error in database connection: ", error);
        throw error;  // Rethrow the error so it can be caught where getConnection is called
    }
}

module.exports = getConnection;

