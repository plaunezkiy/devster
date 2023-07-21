import { createContext } from "react";

export type CurrentTrack = {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: [];
    external_urls: {
      spotify: "string";
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
    release_date: Date;
    release_date_precision: number;
    restrictions: {
      reason: "market";
    };
    type: "album";
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
    label: "string";
    popularity: 0;
    album_group: "compilation";
    artists: [
      {
        external_urls: {
          spotify: "string";
        };
        href: "string";
        id: "string";
        name: "string";
        type: "artist";
        uri: "string";
      }
    ];
  };
  artists: [
    {
      external_urls: {
        spotify: "string";
      };
      followers: {
        href: "string";
        total: 0;
      };
      genres: ["Prog rock", "Grunge"];
      href: "string";
      id: "string";
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n";
          height: 300;
          width: 300;
        }
      ];
      name: "Artist";
      popularity: 0;
      type: "artist";
      uri: "string";
    }
  ];
  available_markets: ["string"];
  disc_number: 0;
  duration_ms: 0;
  explicit: true;
  external_ids: {
    isrc: "string";
    ean: "string";
    upc: "string";
  };
  external_urls: {
    spotify: "string";
  };
  href: "string";
  id: "string";
  is_playable: true;
  linked_from: {};
  restrictions: {
    reason: "string";
  };
  name: "Song";
  popularity: 0;
  preview_url: "string";
  track_number: 0;
  type: "track";
  uri: "string";
  is_local: true;
} | null;

const CurrentTrackContext = createContext<CurrentTrack>(null);

export default CurrentTrackContext;
