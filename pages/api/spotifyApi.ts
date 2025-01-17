import axios from "axios";
import {
  GetMyPlaylistsResponse,
  GetPlaylistTracksRes,
  SearchType,
} from "../../utils/types";

class SpotifyApi {
  private accessToken: string;
  public baseUrl: string;

  constructor() {
    this.accessToken = "";
    this.baseUrl = "https://api.spotify.com/v1"; // Spotify API base URL
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  async fetchAccessTokenFromSession(): Promise<void> {
    try {
      const response = await axios.get("/api/auth/session");
      const session = response.data;

      if (session?.accessToken) {
        this.accessToken = session.accessToken;
      } else {
        throw new Error("No access token found in session."); // Specific error
      }
    } catch (error: unknown) {
      console.error("Error fetching access token from session:", error);

      if (
        error instanceof Error &&
        error.message === "No access token found in session."
      ) {
        throw error;
      }

      throw new Error("Failed to retrieve access token from session.");
    }
  }

  async request(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data: unknown = null
  ): Promise<unknown> {
    if (!this.accessToken) {
      await this.fetchAccessTokenFromSession();
    }

    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios({
        url,
        method,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data,
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Spotify API request error:", error);
      throw error;
    }
  }

  async getMe(): Promise<unknown> {
    return this.request(`/me`);
  }

  async getMyPlaylists(): Promise<GetMyPlaylistsResponse> {
    return this.request(`/me/playlists`) as Promise<GetMyPlaylistsResponse>;
  }

  async getUsersPlaylists(user_id: string): Promise<unknown> {
    return this.request(`/users/${user_id}/playlists`);
  }

  async getPlaylistTracks(playlist_id: string): Promise<GetPlaylistTracksRes> {
    return this.request(
      `/playlists/${playlist_id}/tracks`
    ) as Promise<GetPlaylistTracksRes>;
  }

  async getMyAlbums(): Promise<unknown> {
    return this.request(`/me/albums`);
  }

  async getAlbumsTracks(albumId: string): Promise<unknown> {
    return this.request(`/albums/${albumId}/tracks`);
  }

  async search(query: string, type: SearchType = "track"): Promise<unknown> {
    return this.request(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  }

  async addTrackToPlaylist(
    playlistId: string,
    uris: string[]
  ): Promise<unknown> {
    return this.request(`/playlists/${playlistId}/tracks`, "POST", { uris });
  }

  async updatePlaylistDetails(
    playlistId: string,
    data: { name?: string; description?: string; public?: boolean }
  ): Promise<unknown> {
    return this.request(`/playlists/${playlistId}`, "PUT", data);
  }

  async removeTrackFromPlaylist(
    playlistId: string,
    uris: string[]
  ): Promise<unknown> {
    return this.request(`/playlists/${playlistId}/tracks`, "DELETE", {
      tracks: uris.map((uri) => ({ uri })),
    });
  }
}

export default SpotifyApi;
