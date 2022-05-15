let sessionData = JSON.parse(
  sessionStorage.getItem('spotifyTokenData') ?? 'null'
);
let accessToken = sessionData?.token;
const client_id = 'c0ed2e64c73b4756b693beae2ed7a508';
const redirect_uri = 'http://localhost:3000/';
const authorize_url = 'https://accounts.spotify.com/authorize';

// TODO add url encoding

window.onload = function () {
  checkToken();
  if (!accessToken) {
    let accessTokenMatch = window.location.href.match(
      /(?<=access_token=)[^&]+/
    );
    let expiresInMatch = window.location.href.match(/(?<=expires_in=)[^&]+/);
    if (accessTokenMatch && expiresInMatch) {
      let expiresInNum = Number(expiresInMatch[0]);
      let expirationDate = Date.now() + expiresInNum * 1000;
      window.opener.postMessage(
        {
          content: {
            token: accessTokenMatch[0],
            expires: expiresInMatch[0],
            expirationDate: expirationDate,
          },
          type: 'token',
        },
        'http://localhost:3000/'
      );
      window.close();
    }
  }
};

const Spotify = {
  async retrieveAccessTocken() {
    let url = `${authorize_url}?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    const popup = window.open(url, '_blank', 'popup') as Window;
    return new Promise((resolve) => {
      window.addEventListener('message', listener, false);
      function listener(event: MessageEvent) {
        if (
          event.origin === 'http://localhost:3000' &&
          event.source === popup &&
          event.data.type === 'token'
        ) {
          window.removeEventListener('message', listener);
          resolve(event.data.content);
        }
      }
    });
  },

  async getAccessToken() {
    const tokenData = (await Spotify.retrieveAccessTocken()) as any;
    accessToken = tokenData.token;
    const expiresIn = tokenData.expires;
    const tokenDataJSON = JSON.stringify(tokenData);
    sessionStorage.setItem('spotifyTokenData', `${tokenDataJSON}`);
    window.setTimeout(() => sessionStorage.clear(), Number(expiresIn) * 1000);
    window.history.pushState('Access Token', '', '/');
  },

  async search(term: string) {
    if (!accessToken) {
      await Spotify.getAccessToken();
    }

    const data = await requestApi(`search?type=track&q=${term}`);
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
    if (!(playlistName && trackURIs.length > 0)) {
      return;
    }

    if (!accessToken) {
      await Spotify.getAccessToken();
    }

    // Ger user's ID to pass it in the next response
    const { id: userID } = await requestApi('me');
    // Get created playlist's id to add tracks in the next response; pass playlist's name
    const { id: playlistID} = await requestApi(`users/${userID}/playlists`, {
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    });
    // Post tracks using their URIs and playlist's id
    const shapshotObj = await requestApi(`playlists/${playlistID}/tracks`, {
      method: 'POST',
      body: JSON.stringify({ uris: trackURIs })
    });
    return shapshotObj.hasOwnProperty('snapshot_id');
  },
};

/**
 * Helper function to send Get or Post requests to Spotify API
 * @param endpoint - paths to access different endpoints [https://developer.spotify.com/documentation/web-api/reference/#/]
 * @param args - additional arguments such as METHOD or BODY
 * @returns - JSON response object
 */
async function requestApi(endpoint: string, args?: any) {
  let sessionData = JSON.parse(sessionStorage.getItem('spotifyTokenData') ?? 'null');
  let accessToken = sessionData?.token;
  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    ...args
  }
  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, params);
  if (!response.ok) {
    throw new Error('Request failed!');
  }
  return response.json();
}

/**
 * Check if access token saved in session storage is expired, clear if it's expired
 */
async function checkToken() {
  const tokenData = sessionStorage.getItem('spotifyTokenData');
  let tokenDataObj;
  if (tokenData) {
    tokenDataObj = await JSON.parse(tokenData);
    const tokenExpirationDate = tokenDataObj.expirationDate;
    if (tokenExpirationDate <= Date.now()) {
      sessionStorage.clear();
    }
  }
}

export default Spotify;
