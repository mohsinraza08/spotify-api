const express = require('express');
const router = express.Router();
const { getSpotifyData } = require('../controllers/spotifyController');

router.get('/', getSpotifyData);

module.exports = router;
