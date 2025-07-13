const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true // <-- Enable if you still want multi-query
});

const initDB = () => {
  connection.connect((err) => {
    if (err) return console.error('MySQL connection failed:', err.message);

    // Step 1: Create the database if not exists
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
      (err) => {
        if (err) {
          console.error('Error creating database:', err.message);
          return connection.end();
        }

        // Step 2: Connect to that database and create the table
        connection.changeUser({ database: process.env.DB_NAME }, (err) => {
          if (err) {
            console.error('Error switching database:', err.message);
            return connection.end();
          }

          const createTable = `
            CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              spotify_id VARCHAR(255),
              refresh_token TEXT
            )
          `;

          connection.query(createTable, (err) => {
            if (err) {
              console.error('Error creating users table:', err.message);
            } else {
              console.log('Database and users table ready ✅');
            }
            connection.end();
          });
        });
      }
    );
  });
};

module.exports = initDB;
