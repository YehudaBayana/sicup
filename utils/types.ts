export type SearchType = "track" | "playlist" | "podcast" | "show" | "artist";
export interface Item {
  id: string;
  content: string;
}
export interface GetMyAlbumsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: AlbumItems[];
}

export interface AlbumItems {
  added_at: string;
  album: Album;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: Externalurls;
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: Externalids;
  genres: any[];
  label: string;
  popularity: number;
}

export interface Externalids {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: AlbumTracksItem[];
}

export interface AlbumTracksItem {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: Externalurls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: Linkedfrom;
  restrictions: Restrictions;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Linkedfrom {
  external_urls: Externalurls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: Externalurls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Restrictions {
  reason: string;
}

export interface AlbumImage {
  url: string;
  height: number;
  width: number;
}

export interface Externalurls {
  spotify: string;
}
