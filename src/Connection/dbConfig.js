const mysql = require('mysql2/promise');

const connection = async () => {
    try {
        const dbConfig = {
            host: process.env.MYSQL_Host,
            user: process.env.MYSQL_User,
            password: process.env.MYSQL_Password,
            database: process.env.MYSQL_Schema_Name,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0

        };
        const connection = await mysql.createConnection(dbConfig);
        if (!connection) {
            throw new Error("Database connection failed.");
        } else {
            // console.log(connection)
            return connection;
        }
    } catch (error) {
        console.log("error in connection ",error)
        return error;
    }
}

module.exports = connection;
