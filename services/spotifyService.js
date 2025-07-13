import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data.access_token;
};

export const fetchTopTracks = async () => {
  const token = await getAccessToken();
  const res = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.items.map(track => ({
    name: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    uri: track.uri,
  }));
};

export const fetchNowPlaying = async () => {
  const token = await getAccessToken();
  const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.data || !res.data.item) return null;

  return {
    name: res.data.item.name,
    artist: res.data.item.artists.map(a => a.name).join(', '),
    uri: res.data.item.uri,
  };
};

export const pausePlayback = async () => {
  const token = await getAccessToken();
  await axios.put('https://api.spotify.com/v1/me/player/pause', null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const playTrack = async (uri) => {
  const token = await getAccessToken();
  await axios.put(
    'https://api.spotify.com/v1/me/player/play',
    { uris: [uri] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};