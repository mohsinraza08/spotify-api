import {
  fetchTopTracks,
  fetchNowPlaying,
  pausePlayback,
  playTrack,
} from '../services/spotifyService.js';
import Log from '../models/Log.js';

export const getSpotifyData = async (req, res) => {
  try {
    const topTracks = await fetchTopTracks();
    const nowPlaying = await fetchNowPlaying();
    res.json({ topTracks, nowPlaying });
  } catch (err) {
    console.error('Error in getSpotifyData:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const controlPlayback = async (req, res) => {
  const { action, uri } = req.query;

  try {
    if (action === 'pause') {
      await pausePlayback();
      await Log.create({ action: 'pause' });
      res.json({ status: 'Paused' });
    } else if (action === 'play' && uri) {
      await playTrack(uri);
      const topTracks = await fetchTopTracks();
      const selected = topTracks.find(track => track.uri === uri);

      await Log.create({
        action: 'play',
        trackName: selected?.name || 'Unknown',
        artist: selected?.artist || '',
        uri,
      });

      res.json({ status: 'Playing', uri });
    } else {
      res.status(400).json({ error: 'Invalid action or URI' });
    }
  } catch (err) {
    console.error('Error in controlPlayback:', err.message);
    res.status(500).json({ error: 'Playback control failed' });
  }
};
