// spotify-web-playback.d.ts

declare namespace Spotify {
  interface Player {
    connect(): Promise<boolean>;
    disconnect(): void;
    getCurrentState(): Promise<PlayerState | null>;
    pause(): Promise<void>;
    play(): Promise<void>;
    resume(): Promise<void>;
    seek(position_ms: number): Promise<void>;
    setVolume(volume: number): Promise<void>;
    togglePlay(): Promise<void>;
    addListener(event: PlayerEvent, callback: (event: any) => void): boolean;
    removeListener(
      event: PlayerEvent,
      callback?: (event: any) => void
    ): boolean;
  }

  interface PlayerState {
    duration: number;
    paused: boolean;
    position: number;
    track_window: {
      current_track: Track;
      previous_tracks: Track[];
      next_tracks: Track[];
    };
  }

  interface Track {
    album: {
      images: Array<{ url: string }>;
      name: string;
    };
    artists: Array<{ name: string }>;
    duration_ms: number;
    id: string;
    name: string;
  }

  type PlayerEvent =
    | "ready"
    | "not_ready"
    | "player_state_changed"
    | "initialization_error"
    | "authentication_error"
    | "account_error"
    | "playback_error";

  interface PlaybackError {
    message: string;
  }

  interface ReadyState {
    device_id: string;
  }

  interface PlaybackState {
    position: number;
    duration: number;
    paused: boolean;
  }

  interface SpotifyWindow extends Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => Player;
    };
  }
}

declare global {
  interface Window extends Spotify.SpotifyWindow {}
}
