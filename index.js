const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotifyRoutes');
const initDB = require('./config/initDb');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Initialize DB and Tables
initDB();

app.use('/spotify', spotifyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
