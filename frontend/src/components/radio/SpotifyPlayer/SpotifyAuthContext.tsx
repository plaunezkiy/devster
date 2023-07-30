import { createContext, useContext } from "react";
import { AuthData } from "./types";

export interface SpotifyAuthContextProps {
  isAuthenticated: boolean;
  authData: AuthData | null;
  loading: boolean;
  error: string | null;
  setLoading: (arg0: boolean) => void,
  setError: (arg0: string) => void,
  setAuthData: (arg0: AuthData | null) => void,
  // getAuthData: () => AuthData | null
  // get: (url: string) => Promise<any>;
  // post: (url: string, body?: string) => Promise<any>;
  // put: (url: string, body?: string) => Promise<any>;
  // _delete: (url: string, body?: string) => Promise<any>;
}

const SpotifyAuthContext = createContext<SpotifyAuthContextProps | null>(null);

export const useSpotifyAuthContext = () => useContext(SpotifyAuthContext);

export default SpotifyAuthContext;
