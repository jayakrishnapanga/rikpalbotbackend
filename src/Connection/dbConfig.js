const mysql = require('mysql2/promise');

const connection = async () => {
    try {
        const dbConfig = {
            host: process.env.MYSQL_Host,
            user: process.env.MYSQL_User,
            password: process.env.MYSQL_Password,
            database: process.env.MYSQL_Schema_Name
        };
        const connection = await mysql.createConnection(dbConfig);
        if (!connection) {
            throw new Error("Database connection failed.");
        } else {
            return connection;
        }
    } catch (error) {
        console.log("error is connection is ",error)
        return error;
    }
}

module.exports = connection;
