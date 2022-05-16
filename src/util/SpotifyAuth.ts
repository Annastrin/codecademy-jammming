const client_id = 'c0ed2e64c73b4756b693beae2ed7a508';
const redirect_uri = window.location.origin + '/codecademy-jammming';
const authorize_url = 'https://accounts.spotify.com/authorize';

/**
 * Check if access token saved in session storage is expired, clear if it's expired
 */
export async function getOrIssueAccessToken() {
  let accessToken;
  const sessionData: { token: string; expirationDate: number } | null =
    await JSON.parse(sessionStorage.getItem('spotifyTokenData') ?? 'null');
  const tokenExpirationDate = sessionData?.expirationDate;
  if (tokenExpirationDate && tokenExpirationDate > Date.now()) {
    accessToken = sessionData.token;
    return accessToken;
  } else {
    sessionStorage.clear();
    return (accessToken = await issueNewAccessToken());
  }
}

window.onload = function () {
  let accessTokenMatch = window.location.href.match(/(?<=access_token=)[^&]+/);
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
      redirect_uri
    );
    window.close();
  }
};

async function retrieveAccessTocken() {
  let url = `${authorize_url}?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
  const popup = window.open(url, '_blank', 'popup') as Window;
  return new Promise((resolve) => {
    window.addEventListener('message', listener, false);
    function listener(event: MessageEvent) {
      if (
        event.origin === window.location.origin &&
        event.source === popup &&
        event.data.type === 'token'
      ) {
        window.removeEventListener('message', listener);
        resolve(event.data.content);
      }
    }
  });
}

async function issueNewAccessToken() {
  const tokenData = (await retrieveAccessTocken()) as any;
  const accessToken = tokenData.token;
  const expiresIn = tokenData.expires;
  const tokenDataJSON = JSON.stringify(tokenData);
  sessionStorage.setItem('spotifyTokenData', `${tokenDataJSON}`);
  window.setTimeout(() => sessionStorage.clear(), Number(expiresIn) * 1000);
  return accessToken;
}
