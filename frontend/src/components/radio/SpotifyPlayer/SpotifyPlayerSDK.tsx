import { ReactNode } from "react";
import { useCallback } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { useSpotifyAuthContext } from "@/components/radio/SpotifyPlayer/SpotifyAuthContext";
import { getAuthData } from "./utils/getAuthData";

const SpotifyPlayerSDK = ({ children }: { children: ReactNode }) => {
  const { authData } = useSpotifyAuthContext() || {};
  const getOAuthToken = useCallback((callback: (arg0: any) => {}) => {
    callback(authData?.access_token);
  }, []);

  // const getToken = () => JSON.parse(cookies().get("authData")?.value || "null");

  return (
    <>
      <WebPlaybackSDK
        initialDeviceName="Devster Radio"
        getOAuthToken={async () => (await getAuthData())?.access_token}
        initialVolume={1}
      >
        {children}
      </WebPlaybackSDK>
    </>
  );
};

export default SpotifyPlayerSDK;
