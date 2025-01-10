import axios from "axios";

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
    } catch (error: any) {
      console.error("Error fetching access token from session:", error.message);
      throw new Error("Failed to retrieve access token from session.");
    }
  }

  // Make API requests to Spotify
  async request(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data: any = null
  ): Promise<any> {
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
    } catch (error: any) {
      console.error(
        "Spotify API request error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Example method to get Spotify profile data
  async getProfile(): Promise<any> {
    return this.request("/me");
  }

  async getMyPlaylists(): Promise<any> {
    return this.request("/me/playlists");
  }

  // Example method to search Spotify
  async search(query: string, type: string = "track"): Promise<any> {
    return this.request(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  }
}

export default SpotifyApi;
