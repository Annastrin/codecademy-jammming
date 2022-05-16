import { getOrIssueAccessToken } from './SpotifyAuth';

const Spotify = {
  async search(term: string) {
    const accessToken = await getOrIssueAccessToken();

    const data = await requestApi(
      `search?type=track&q=${encodeURIComponent(term)}`,
      accessToken
    );
    if (data.tracks) {
      return data.tracks.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } else {
      return [];
    }
  },

  /**
   * Save a new playlist to user's Spotify account
   * @param playlistName - playlist name from App.tsx
   * @param trackURIs - trackURIs from App.tsx
   * @returns - true if final response has 'snapshot_id' property, or false
   */
  async savePlaylist(playlistName: string, trackURIs: string[]) {
    const accessToken = await getOrIssueAccessToken();

    // Ger user's ID to pass it in the next response
    const { id: userID } = await requestApi('me', accessToken);
    // Get created playlist's id to add tracks in the next response; pass playlist's name
    const { id: playlistID } = await requestApi(
      `users/${userID}/playlists`,
      accessToken,
      {
        method: 'POST',
        body: JSON.stringify({ name: playlistName }),
      }
    );
    // Post tracks using their URIs and playlist's id
    const shapshotObj = await requestApi(
      `playlists/${playlistID}/tracks`,
      accessToken,
      {
        method: 'POST',
        body: JSON.stringify({ uris: trackURIs }),
      }
    );
    return shapshotObj.hasOwnProperty('snapshot_id');
  },
};

/**
 * Helper function to send Get or Post requests to Spotify API
 * @param endpoint - paths to access different endpoints [https://developer.spotify.com/documentation/web-api/reference/#/]
 * @param token - Spotify user's access token
 * @param args - additional arguments such as METHOD or BODY
 * @returns - JSON response object
 */
async function requestApi(endpoint: string, token: string | null, args?: any) {
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...args,
  };
  const response = await fetch(
    `https://api.spotify.com/v1/${endpoint}`,
    params
  );
  if (!response.ok) {
    throw new Error('Request failed!');
  }
  return response.json();
}

export default Spotify;
