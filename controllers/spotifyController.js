const {
  getTopTracks,
  getNowPlaying,
  playTrack,
  pauseTrack
} = require('../services/spotifyService');

const getSpotifyData = async (req, res) => {
  const { action, uri } = req.query;

  try {
    if (action === 'pause') {
      await pauseTrack();
      return res.json({ status: 'Paused' });
    }

    if (action === 'play' && uri) {
      await playTrack(uri);
      return res.json({ status: 'Playing', uri });
    }

    const [topTracks, nowPlaying] = await Promise.all([
      getTopTracks(),
      getNowPlaying()
    ]);

    res.json({
      topTracks: topTracks.map((track) => ({
        name: track.name,
        artist: track.artists.map((a) => a.name).join(', '),
        uri: track.uri
      })),
      nowPlaying: nowPlaying?.item
        ? {
            name: nowPlaying.item.name,
            artist: nowPlaying.item.artists.map((a) => a.name).join(', '),
            uri: nowPlaying.item.uri
          }
        : 'Nothing is playing currently'
    });
  } catch (err) {
    console.error('Spotify Controller Error:', err);
    res.status(500).json({ error: 'Spotify API error' });
  }
};

module.exports = { getSpotifyData };