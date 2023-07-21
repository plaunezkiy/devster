import { createBrowserRouter, useRouteError } from "react-router-dom";
import HomePage from "@/components/HomePage";
import CreateRoomPage from "@/components/CreateRoomPage";
import JoinRoomPage from "@/components/JoinRoomPage";
import RoomPage from "@/components/RoomPage";
import DemoPage from "@/components/DemoPage";
import Lottie from "lottie-react";
import errorAnimation from "@/assets/errorAnimation.json";

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xl font-semibold">Dang, something's wrong!</p>
      <p className="text-lg font-semibold">
        {error.status} - {error.statusText}
      </p>
      <div className="w-96 h-96">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/demo",
      element: <DemoPage />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/create",
      element: <CreateRoomPage />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/join",
      element: <JoinRoomPage />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/rooms/:roomCode",
      element: <RoomPage />,
      errorElement: <ErrorBoundary />,
    },
  ],
  {
    basename: "/apps/radio",
  }
);

export default router;
