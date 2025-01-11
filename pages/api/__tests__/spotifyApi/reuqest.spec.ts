import axios from "axios";
import SpotifyApi from "../../spotifyApi";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("SpotifyApi: request", () => {
  let spotifyApi: SpotifyApi;

  beforeEach(() => {
    spotifyApi = new SpotifyApi();
  });

  it("should call fetchAccessTokenFromSession if access token is missing", async () => {
    const spy = jest.spyOn(spotifyApi, "fetchAccessTokenFromSession");
    mockedAxios.get.mockResolvedValueOnce({
      data: { accessToken: "test_token" },
    });
    mockedAxios.mockResolvedValueOnce({ data: {} });

    await spotifyApi.request("/me");
    expect(spy).toHaveBeenCalled();
  });

  it("should construct the correct request", async () => {
    spotifyApi.setAccessToken("test_token");
    mockedAxios.mockResolvedValueOnce({ data: { user: "me" } });

    const response = await spotifyApi.request("/me");
    expect(mockedAxios).toHaveBeenCalledWith({
      url: "https://api.spotify.com/v1/me",
      method: "GET",
      headers: {
        Authorization: "Bearer test_token",
        "Content-Type": "application/json",
      },
      data: null,
    });
    expect(response).toEqual({ user: "me" });
  });

  it("should throw an error on API failure", async () => {
    spotifyApi.setAccessToken("test_token");
    mockedAxios.mockRejectedValueOnce(new Error("API error"));

    await expect(spotifyApi.request("/me")).rejects.toThrow("API error");
  });
});
