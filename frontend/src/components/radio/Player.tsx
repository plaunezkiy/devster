import { BsSpotify } from "react-icons/bs";
import { useSpotifyAuthContext } from "./SpotifyPlayer/SpotifyAuthContext";
import getSpotifyLoginQuery from "./SpotifyPlayer/getSpotifyLoginQuery";

const Player = ({
  setFullScreen,
}: {
  setFullScreen: (arg0: boolean) => void;
}) => {
    
  const { isAuthenticated, loading, error } = useSpotifyAuthContext() || {};
  const spotifyLogin = () => {
    // https://api.spotify.com/authorize
    // if (authData) return;
    const query = getSpotifyLoginQuery();
    window.location.href = "https://accounts.spotify.com/authorize?" + query;
  };

  return (
    // <SpotifyAuthContext.Provider value={authData}>
    <div className="w-full flex flex-col gap-12">
      {/* login button */}
      {!isAuthenticated && (
        <div className="flex flex-col gap-2 items-center text-lg font-semibold text-center">
          <p>To use the player, you need to log in with your Spotify account</p>
          <p className="text-sm mb-2 text-mute">
            Devster does not store nor has access to your credentials
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={spotifyLogin}
              className="
                  border border-1 border-slate-700 dark:border-gray-200
                  px-4 py-2 rounded-lg 
                  hover:text-white dark:hover:text-slate-800
                  hover:bg-slate-700 dark:hover:bg-gray-200
                  flex gap-2 items-center"
            >
              Log In With
              <BsSpotify className="w-6 h-6 text-green-600 duration-150 cursor-pointer" />
            </button>
            {/* <button
                  // https://api.spotify.com/authorize
                  // if (authData) return;
                  onClick={updateState}
                  className="outline outline-1 p-1 rounded-lg text-sm hover:text-white hover:bg-black"
                >
                  Fetch
                </button> */}
          </div>
        </div>
      )}
      <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
        {/* <Playlists /> */}
        {isAuthenticated && (
          <div className="flex flex-col gap-6 justify-center md:justify-start items-center">
            {/* {activeSongData && (
              <FeaturesHorizontal
                features={activeSongData}
                setFeatures={setRecFeatures}
              />
            )} */}
            <p
              className="
                      order-first md:order-last
                      border border-1 w-full
                      border-slate-700 dark:border-gray-200
                      px-4 py-2 rounded-lg text-center
                    "
            >
              v 0.1.2
            </p>
            <button
              onClick={spotifyLogin}
              className="
                    order-first md:order-last
                    border border-1 w-full
                    border-slate-700 dark:border-gray-200
                    px-4 py-2 rounded-lg 
                    hover:text-white dark:hover:text-slate-800
                    hover:bg-slate-700 dark:hover:bg-gray-200
                    flex gap-2 items-center justify-center"
            >
              Re-Login With
              <BsSpotify className="w-6 h-6 text-green-600 duration-150 cursor-pointer" />
            </button>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {/* <Piano segment={currentSegment} /> */}
          <p>Playa</p>
        </div>
      </div>
    </div>
    // </SpotifyAuthContext.Provider>
  );
};

export default Player;
