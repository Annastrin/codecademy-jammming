let accessToken = localStorage.getItem('spotifyAccessToken');
const client_id = 'c0ed2e64c73b4756b693beae2ed7a508';
const redirect_uri = 'http://localhost:3000/';
const authorize_url = 'https://accounts.spotify.com/authorize';

window.onload = function () {
  let tockenIsExpired = localStorage.getItem('spotifyTokenExpirationDate') && Number(localStorage.getItem('spotifyTokenExpirationDate')) <= Date.now();
  if (tockenIsExpired) {
    localStorage.clear();
  }
  if (!accessToken) {
    let accessTokenMatch = window.location.href.match(/(?<=access_token=)[^&]+/);
    let expiresInMatch = window.location.href.match(/(?<=expires_in=)[^&]+/);
    if (accessTokenMatch && expiresInMatch) {
      window.opener.postMessage({content: {token: accessTokenMatch, expires: expiresInMatch}, type: "token"}, 'http://localhost:3000/');
      window.close();
    }
  }
}


const Spotify = {
  async retrieveAccessTocken() {
    let url = `${authorize_url}?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    const popup = window.open(url, '_blank', 'popup') as Window;
    return new Promise(resolve => {
      window.addEventListener("message", listener, false);
      function listener(event: MessageEvent) {
        if (event.origin === 'http://localhost:3000' && event.source === popup && event.data.type === 'token') {
          window.removeEventListener("message", listener)
          resolve(event.data.content)
        }
      }
    })

  },

  async search(term: string) {
    //accessToken = localStorage.getItem('spotifyAccessToken');
    if (!accessToken) {
      const tokenData = await Spotify.retrieveAccessTocken() as any;
      accessToken = tokenData.token;
      const expiresIn = tokenData.expires;
      localStorage.setItem('spotifyAccessToken', `${accessToken}`);
      localStorage.setItem('spotifyTokenExpirationDate', `${Date.now() + expiresIn * 1000}`);
      window.setTimeout(() => localStorage.clear(), Number(expiresIn) * 1000);
      window.history.pushState('Access Token', '', '/');  accessToken = localStorage.getItem('spotifyAccessToken');
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