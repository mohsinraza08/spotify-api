const axios = require('axios');
const { refreshAccessToken } = require('../config/spotifyAuth');

const getHeaders = async () => {
  const token = await refreshAccessToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

const getTopTracks = async () => {
  const headers = await getHeaders();
  const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', { headers });
  return response.data.items;
};

const getNowPlaying = async () => {
  const headers = await getHeaders();
  const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers });
  return response.data;
};

const playTrack = async (uri) => {
  const headers = await getHeaders();
  await axios.put('https://api.spotify.com/v1/me/player/play', { uris: [uri] }, { headers });
};

const pauseTrack = async () => {
  const headers = await getHeaders();
  await axios.put('https://api.spotify.com/v1/me/player/pause', {}, { headers });
};

module.exports = {
  getTopTracks,
  getNowPlaying,
  playTrack,
  pauseTrack
};