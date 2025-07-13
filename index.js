import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import spotifyRoutes from './routes/spotify.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
connectDB();
app.use('/spotify', spotifyRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
