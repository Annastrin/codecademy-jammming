/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Global } from '@emotion/react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import { TrackInfo } from '../../appTypes';
import { globalStyles, app, app_playlist, highlight } from './App-styles';

function App() {
  const [searchResults, setSearchResults] = useState<TrackInfo[]>([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState<TrackInfo[]>([]);

  function addTrack(track: TrackInfo) {
    if (
      track &&
      playlistTracks.find((soundTrack) => soundTrack.id === track.id) ===
        undefined
    ) {
      setPlaylistTracks((prevPlaylistTracks) => [...prevPlaylistTracks, track]);
    }
  }

  function removeTrack(track: TrackInfo) {
    const newPlaylistTracks = playlistTracks.filter(
      (soundTrack) => soundTrack.id !== track.id
    );
    setPlaylistTracks(newPlaylistTracks);
  }

  function updatePlaylistName(name: string) {
    setPlaylistName(name);
  }

  async function savePlaylist() {
    const trackURIs = playlistTracks.map(
      (track) => `spotify:track:${track.id}`
    );

    if (playlistName && trackURIs.length > 0) {
      const savePlaylistPromise = Spotify.savePlaylist(playlistName, trackURIs);
      await toast.promise(savePlaylistPromise, {
        pending: 'Saving...',
        success: {
          render() {
            return 'Saved!';
          },
          autoClose: 750,
          onClose: () => {
            setPlaylistName('New Playlist');
            setPlaylistTracks([]);
          },
        },
        error: {
          render({ data }) {
            return `${data.message}`;
          },
        },
      });
    }
  }

  async function search(searchRequest: string) {
    const searchResultsPromise = Spotify.search(searchRequest);
    const searchResults = await toast.promise(searchResultsPromise, {
      error: {
        render({ data }) {
          return `${data.message}`;
        },
      },
    });
    setSearchResults(searchResults);
  }

  return (
    <div>
      <Global styles={globalStyles} />
      <h1>
        Ja<span css={highlight}>mmm</span>ing
      </h1>
      <div css={app}>
        <SearchBar onSearch={search} />
        <div css={app_playlist}>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        role='alert'
      />
    </div>
  );
}

export default App;
