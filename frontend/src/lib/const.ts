export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://dvstr.net/"
    : "http://localhost:3000/";

export const API_URL = process.env.NODE_ENV === "production" ? "https://api.dvstr.net/" : "http://127.0.0.1:8000/api/";

export const SPOTIFY_ACCESS_SCOPE =
  "user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-library-modify streaming playlist-modify-private playlist-modify-public";

export const SPOTIFY_CLIENT_ID = "1b529e30c45c436ab981c95bfa4c57f4";

export const SPOTIFY_REDIRECT_URI = BASE_URL + "apps/radio/callback";
