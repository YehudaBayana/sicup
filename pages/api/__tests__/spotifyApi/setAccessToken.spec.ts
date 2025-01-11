import SpotifyApi from "../../spotifyApi";

describe("SpotifyApi: setAccessToken", () => {
  let spotifyApi: SpotifyApi;

  beforeEach(() => {
    spotifyApi = new SpotifyApi();
  });

  it("should set access token", () => {
    spotifyApi.setAccessToken("test_token");
    expect(spotifyApi["accessToken"]).toBe("test_token");
  });
});
