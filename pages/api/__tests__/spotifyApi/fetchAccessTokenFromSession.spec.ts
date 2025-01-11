import axios from "axios";
import SpotifyApi from "../../spotifyApi";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("SpotifyApi: fetchAccessTokenFromSession", () => {
  let spotifyApi: SpotifyApi;

  beforeEach(() => {
    spotifyApi = new SpotifyApi();
  });

  it("should set access token if session includes it", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { accessToken: "test_token" },
    });

    await spotifyApi.fetchAccessTokenFromSession();
    expect(spotifyApi["accessToken"]).toBe("test_token");
  });

  it("should throw error if session does not include access token", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await expect(spotifyApi.fetchAccessTokenFromSession()).rejects.toThrow(
      "No access token found in session."
    );
  });

  it("should handle errors gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(spotifyApi.fetchAccessTokenFromSession()).rejects.toThrow(
      "Failed to retrieve access token from session."
    );
  });
});
