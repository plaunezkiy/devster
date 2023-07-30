import { useContext, useRef, useState } from "react";
import SpotifyAuthContext, {
  useSpotifyAuthContext,
} from "@/components/radio/SpotifyPlayer/SpotifyAuthContext";
import { useRefreshTokenFetch } from "./useFetch";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { BsSpeaker, BsCheck } from "react-icons/bs";
import { RiSpeakerLine, RiSpeakerFill } from "react-icons/ri";
import { Device } from "./types";
import { useSpotifyClient } from "./utils/client";
// import { VideoIcon, CheckIcon } from "@radix-ui/react-icons";

const AvailableDevices = () => {
  const [display, setDisplay] = useState(false);
  const [devices, setDevices] = useState([]);
  const elRef = useRef(null);
  useClickOutside(elRef, () => setDisplay(false));
  const { isAuthenticated } = useSpotifyAuthContext() || {};
  const { get, post, put, _delete } = useSpotifyClient();
  const getAvailableDevices = () => {
    if (!isAuthenticated) return;
    get?.("https://api.spotify.com/v1/me/player/devices").then((data) =>
      setDevices(data.devices)
    );
  };

  const transferPlayback = (device_id: string) => {
    if (!isAuthenticated) return;
    put?.(
      "https://api.spotify.com/v1/me/player",
      JSON.stringify({
        device_ids: [device_id],
      })
    );
  };

  return (
    <div className="relative" ref={elRef}>
      <p
        onClick={() => {
          getAvailableDevices();
          setDisplay(!display);
        }}
        className="cursor-pointer"
      >
        <BsSpeaker className="w-9 h-9 p-1 text-blue-500 hover:text-white hover:bg-blue-500 rounded duration-150" />
      </p>
      {display && (
        <div className="absolute w-28 top-10 right-0 flex flex-col divide-y border overflow-hidden rounded bg-white">
          {devices.map((device: Device) => (
            <p
              className="p-1 cursor-pointer hover:bg-blue-500 text-slate-800 hover:text-white flex items-center gap-2 justify-center duration-150"
              key={device.id}
              onClick={() => {
                setDisplay(false);
                transferPlayback(device.id);
              }}
            >
              {device.is_active && <BsCheck className="w-5 h-5" />}
              {device.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableDevices;
