import { VscLoading } from "react-icons/vsc";
import { BsPlus, BsCheck } from "react-icons/bs";
import { useContext, useState } from "react";
import { msToMinsSecs } from "./utils/converter";
import SpotifyAuthContext, {
  useSpotifyAuthContext,
} from "./SpotifyAuthContext";
import { useRefreshTokenFetch } from "./useFetch";
import { PlaybackState, Track, TrackFeatures } from "./types";
import { useSpotifyClient } from "./utils/client";
// import useAudio from "@/hooks/useAudio";

const TrackItem = ({ track }: { track: Track }) => {
  const [added, setAdded] = useState(false);
  const authData = useContext(SpotifyAuthContext);
  const { loading } = useSpotifyAuthContext() || {};
  const { get, post, put, _delete } = useSpotifyClient();
  const addToQueue = (track_uri: string) => {
    if (!authData) return;
    post?.(`https://api.spotify.com/v1/me/player/queue?uri=${track_uri}`).then(
      (data) => setAdded(true)
    );
  };

  const statusIcon = added ? (
    <BsCheck className="w-5 h-5 group-hover/button:text-white" />
  ) : (
    <BsPlus className="w-5 h-5 group-hover/button:text-white" />
  );

  return (
    <div className="h-fit p-2.5 pl-[2rem] relative flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-zinc-600">
      <button
        // onClick={() => (playing ? audio.pause() : audio.play())}
        className="absolute left-0 w-10 h-full hover:bg-green-500 group focus:outline-none group/button divide-x flex justify-center items-center"
        onClick={() => addToQueue(track.uri)}
      >
        {loading ? <VscLoading className="w-5 h-5 animate-spin" /> : statusIcon}
      </button>
      <div className="flex-1 text-sm">
        {track.artists[0].name} - {track.name}
      </div>
      <div className="text-xs text-gray-400">
        {msToMinsSecs(track.duration_ms)}
      </div>
      {/* <button
        onClick={() => addToQueue(track.uri)}
        className="focus:outline-none group/button"
      >
        <PlusCircledIcon className="w-5 h-5 group-hover/button:text-green-500" />
      </button>
      <button className="focus:outline-none pr-2 group/button">
        <ReloadIcon className="w-5 h-5 group-hover/button:text-blue-500" />
      </button> */}
    </div>
  );
};

const SongRecommendations = ({
  playerData,
  recFeatures,
}: {
  playerData: PlaybackState | null;
  recFeatures: TrackFeatures;
}) => {
  const authData = useContext(SpotifyAuthContext);
  const [recommendations, setRecommendations] = useState({
    seeds: [],
    tracks: [],
  });
  const [queue, setQueue] = useState([]);
  // const { loading, error, get, post, put } = useSpotifyAuthContext() || {};
  const { get, post, put, _delete } = useSpotifyClient();

  const getRecommendations = () => {
    // get recs based on params
    if (!authData) return;
    if (!playerData) return;
    const query = Object.keys(recFeatures)
      .filter((key) => recFeatures[key as keyof typeof recFeatures].active)
      .map(
        (key) =>
          `target_${key}=${recFeatures[key as keyof typeof recFeatures].value}`
      )
      .join("&");
    get?.(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${playerData.item.id}&${query}`
    ).then((data) => setRecommendations(data));
  };

  // const playPreview = (preview_url) => {
  //   console.log(preview_url);
  //   setSrc(preview_url);
  //   load();
  //   play();
  //   // fetchData(
  //   //   "https://api.spotify.com/v1/me/player/queue",
  //   //   authData,
  //   //   (data) => {
  //   //     const uris = [track_uri, ...data.queue.map((item) => item.uri)];
  //   //     console.log([track_uri, ...data.queue.map((item) => item.uri)]);
  //   //     putData(
  //   //       "https://api.spotify.com/v1/me/player/play",
  //   //       authData,
  //   //       JSON.stringify({
  //   //         uris,
  //   //       })
  //   //     );
  //   //   }
  //   // );
  // };

  return (
    <div className="w-full divide-y divide-black">
      <div className="flex px-2 justify-between bg-gray-100 dark:bg-zinc-600">
        <p className="my-2 text-center font-semibold select-none">
          Recommendations:
        </p>
        <div className="buttons flex gap-2 items-center">
          <button
            className="font-semibold py-1 px-3 border border-blue-500 rounded text-slate-700 dark:text-white hover:text-white hover:bg-blue-500 duration-150"
            onClick={getRecommendations}
          >
            Reload
          </button>
          {/* <button
            className="font-semibold py-1 px-2 border border-blue-500 rounded text-slate-700 dark:text-white hover:text-white hover:bg-blue-500 duration-150"
            onClick={() =>
              setRecommendations({
                seeds: [],
                tracks: [],
              })
            }
          >
            Clear
          </button> */}
        </div>
      </div>
      <div className="flex flex-col text-xs sm:text-base divide-y divide-black cursor-default">
        {recommendations.tracks.map(
          (track: Track) => (
            <TrackItem key={track.id} track={track} />
          )
          // {
          //     // const audio = new Audio(track.preview_url);
          //     return (
          //       <li
          //         key={track.id}
          //         className="h-fit relative flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-zinc-600"
          //       >
          //         <button
          //           // onClick={() => (playing ? audio.pause() : audio.play())}
          //           className="relative h-full p-2.5 hover:bg-green-500 group focus:outline-none group/button"
          //         >
          //           <PlusIcon
          //             className="w-5 h-5 group-hover/button:text-white"
          //             onClick={() => addToQueue(track.uri)}
          //           />
          //         </button>
          //         <div className="flex-1 text-sm">
          //           {track.artists[0].name} - {track.name}
          //         </div>
          //         <div className="text-xs text-gray-400">
          //           {msToMinsSecs(track.duration_ms)}
          //         </div>
          //         <button
          //           onClick={() => addToQueue(track.uri)}
          //           className="focus:outline-none group/button"
          //         >
          //           <PlusCircledIcon className="w-5 h-5 group-hover/button:text-green-500" />
          //         </button>
          //         <button className="focus:outline-none pr-2 group/button">
          //           <ReloadIcon className="w-5 h-5 group-hover/button:text-blue-500" />
          //         </button>
          //       </li>
          //     );
        )}
      </div>
    </div>
  );
};

export default SongRecommendations;
