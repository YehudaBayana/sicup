import SpotifyApi from "../../spotifyApi";

describe("SpotifyApi: helper methods", () => {
  let spotifyApi: SpotifyApi;

  beforeEach(() => {
    spotifyApi = new SpotifyApi(); // Create a fresh instance for each test
  });

  it("should call request with correct endpoint for getMe", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    await spotifyApi.getMe();
    expect(spy).toHaveBeenCalledWith("/me");
  });

  it("should call request with correct endpoint for getMyPlaylists", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    await spotifyApi.getMyPlaylists();
    expect(spy).toHaveBeenCalledWith("/me/playlists");
  });

  it("should call request with correct endpoint for getMyAlbums", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    await spotifyApi.getMyAlbums();
    expect(spy).toHaveBeenCalledWith("/me/albums");
  });

  it("should call request with correct endpoint for getAlbumsTracks", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    const albumId = "testAlbumId";
    await spotifyApi.getAlbumsTracks(albumId);
    expect(spy).toHaveBeenCalledWith(`/albums/${albumId}/tracks`);
  });

  it("should call request with correct endpoint and query params for search", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    const query = "testQuery";
    const type = "artist";
    await spotifyApi.search(query, type);
    expect(spy).toHaveBeenCalledWith(
      `/search?q=${encodeURIComponent(query)}&type=${type}`
    );
  });

  it("should call request with correct endpoint, method, and data for addTrackToPlaylist", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    const playlistId = "testPlaylistId";
    const uris = ["uri1", "uri2"];
    await spotifyApi.addTrackToPlaylist(playlistId, uris);
    expect(spy).toHaveBeenCalledWith(
      `/playlists/${playlistId}/tracks`,
      "POST",
      { uris }
    );
  });

  it("should call request with correct endpoint, method, and data for updatePlaylistDetails", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    const playlistId = "testPlaylistId";
    const data = {
      name: "New Playlist",
      description: "Updated description",
      public: true,
    };
    await spotifyApi.updatePlaylistDetails(playlistId, data);
    expect(spy).toHaveBeenCalledWith(`/playlists/${playlistId}`, "PUT", data);
  });

  it("should call request with correct endpoint, method, and data for removeTrackFromPlaylist", async () => {
    const spy = jest.spyOn(spotifyApi, "request").mockResolvedValueOnce({});
    const playlistId = "testPlaylistId";
    const uris = ["uri1", "uri2"];
    await spotifyApi.removeTrackFromPlaylist(playlistId, uris);
    expect(spy).toHaveBeenCalledWith(
      `/playlists/${playlistId}/tracks`,
      "DELETE",
      {
        tracks: uris.map((uri) => ({ uri })),
      }
    );
  });
});
