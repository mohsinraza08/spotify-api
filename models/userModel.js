const db = require('../config/db');

const createUser = (spotify_id, refresh_token) => {
  const query = 'INSERT INTO users (spotify_id, refresh_token) VALUES (?, ?)';
  db.query(query, [spotify_id, refresh_token], (err, result) => {
    if (err) console.error('Insert user failed:', err.message);
    else console.log('User saved:', result.insertId);
  });
};

module.exports = { createUser };
