import { useState, useEffect } from "react";

// import SpotifyPlayer from "@/components/spotify/SpotifyPlayer";
// import AvailableDevices from "@/components/spotify/AvailableDevices";
// import FullScreenModal from "@/components/FullScreenModal";
import { useRefreshTokenFetch } from "@/hooks/useFetch";
import router from "@/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  const { loading, error, fetchData } = useRefreshTokenFetch();

  return <RouterProvider router={router} />;
};

export default App;
