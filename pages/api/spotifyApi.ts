import axios from "axios";
import { SearchType } from "../../utils/types";

class SpotifyApi {
  private accessToken: string;
  private baseUrl: string;

  constructor() {
    this.accessToken = "";
    this.baseUrl = "https://api.spotify.com/v1"; // Spotify API base URL
  }

  // Set the access token
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  // Get the access token from the session (next-auth)
  async fetchAccessTokenFromSession(): Promise<void> {
    try {
      // Fetch the session from the next-auth session API
      const response = await axios.get("/api/auth/session");
      const session = response.data;

      if (session?.accessToken) {
        this.accessToken = session.accessToken;
      } else {
        throw new Error("No access token found in session.");
      }
    } catch (error: unknown) {
      console.error("Error fetching access token from session:", error);
      throw new Error("Failed to retrieve access token from session.");
    }
  }

  // Make API requests to Spotify
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

  // Example method to get Spotify profile data
  async getMe(): Promise<unknown> {
    return this.request(`/me`);
  }

  async getMyPlaylists(): Promise<unknown> {
    return this.request(`/me/playlists`);
  }

  async getMyAlbums(): Promise<unknown> {
    return this.request(`/me/albums`);
  }

  async getAlbumsTracks(albumId: string): Promise<unknown> {
    return this.request(`/albums/${albumId}/tracks`);
  }

  // Example method to search Spotify
  async search(query: string, type: SearchType = "track"): Promise<unknown> {
    return this.request(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  }

  async addTrackToPlaylist(
    playlistId: string,
    uris: string[]
  ): Promise<unknown> {
    return this.request(`/playlists/${playlistId}/tracks`, "POST", { uris });
  }

  // PUT example: Update a playlist's details
  async updatePlaylistDetails(
    playlistId: string,
    data: { name?: string; description?: string; public?: boolean }
  ): Promise<unknown> {
    return this.request(`/playlists/${playlistId}`, "PUT", data);
  }

  // DELETE example: Remove a track from a playlist
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
