import { createContext } from "react";
import { Playlist } from "./types";

const SpotifyPlaylistsContext = createContext<{
  selected: Playlist[];
  all: Playlist[];
}>({
  selected: [],
  all: [],
});

export default SpotifyPlaylistsContext;
