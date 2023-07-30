import {
  SPOTIFY_ACCESS_SCOPE,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
} from "@/lib/const";

const getSpotifyLoginQuery = () => {
  // https://api.spotify.com/authorize
  // if (authData) return;

  const params = {
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: SPOTIFY_ACCESS_SCOPE,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  };
  const query = Object.keys(params)
    .map((key) => key + "=" + params[key as keyof typeof params])
    .join("&");
  return query;
};

export default getSpotifyLoginQuery;
