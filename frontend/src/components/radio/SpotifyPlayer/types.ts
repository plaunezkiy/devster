export type Device = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
};

export type TrackFeature = {
  active: boolean;
  value: number;
};

export type TrackFeatures = {
  key: TrackFeature;
  mode: TrackFeature;
  tempo: TrackFeature;
  danceability: TrackFeature;
  energy: TrackFeature;
  loudness: TrackFeature;
  speechiness: TrackFeature;
  acousticness: TrackFeature;
  instrumentalness: TrackFeature;
  liveness: TrackFeature;
  valence: TrackFeature;
};

export type AuthData = {
  access_token: string;
  refresh_token: string;
};

export type Artist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: 300;
      width: 300;
    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  copyrights: [
    {
      text: string;
      type: string;
    }
  ];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: [
    {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }
  ];
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: [string];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Track[];
  };
  type: string;
  uri: string;
};

export type PlaylistList = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Playlist[];
};

export type PlaybackState = {
  device: {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
  };
  repeat_state: string;
  shuffle_state: boolean;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  };
  timestamp: EpochTimeStamp;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
  currently_playing_type: string;
  actions: {
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle: boolean;
    toggling_repeat_track: boolean;
    transferring_playback: boolean;
  };
};

export type PlayerQueue = {
  currently_playing: Track;
  queue: Track[];
};
