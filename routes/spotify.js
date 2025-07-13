import express from 'express';
import { getSpotifyData, controlPlayback } from '../controllers/spotifyController.js';

const router = express.Router();
router.get('/', getSpotifyData);
router.get('/action', controlPlayback);

export default router;
