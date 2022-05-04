let accessToken: string;
const client_id = 'c0ed2e64c73b4756b693beae2ed7a508';
const redirect_uri = 'http://localhost:3000/';
const authorize_url = 'https://accounts.spotify.com/authorize';

const Spotify = {
  getAccessTocken() {
    if (!accessToken) {
      let accessTokenMatch = window.location.href.match(/(?<=access_token=)[^&]+/);
      let expiresInMatch = window.location.href.match(/(?<=expires_in=)[^&]+/);
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[0];
        const expiresIn = expiresInMatch[0];
        window.setTimeout(() => accessToken = '', Number(expiresIn) * 1000);
        window.history.pushState('Access Token', '', '/');
      } else {
        let url = `${authorize_url}?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}` as (string | Location) & Location;
        window.location = url;
      }
    }
    console.trace(accessToken);
  },

  search(term: string) {
    console.trace(accessToken);
    if (!accessToken) {
      Spotify.getAccessTocken();
    }
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message)
    })
    .then(data => {
      if (data.tracks) {
        return data.tracks.items.map((track: any) => (
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        ));
      } else {
        return [];
      }
    })
  }
}

export default Spotify;