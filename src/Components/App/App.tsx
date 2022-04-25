/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { TrackInfo } from '../../appTypes';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Global } from '@emotion/react';
import { globalStyles, app, app_playlist, highlight } from './App-styles';

function App() {
  const [searchResults, setSearchResults] = useState<TrackInfo[]>([
    {
      name: 'Black and Hollow',
      artist: 'Mercenary',
      album: 'Architect of Lies',
      id: '0',
    },
    {
      name: 'Zeit',
      artist: 'Rammstein',
      album: 'Zeit',
      id: '1',
    },
    {
      name: 'Steh auf',
      artist: 'Lindemann',
      album: 'F&M',
      id: '2',
    },
  ]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState<TrackInfo[]>([
    {
      name: 'So Cold',
      artist: 'Breaking Benjamin',
      album: 'Shallow Bay',
      id: '3',
    },
    {
      name: 'Hero',
      artist: 'Skillet',
      album: 'Awake',
      id: '4',
    },
  ]);

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

  return (
    <div>
      <Global styles={globalStyles} />
      <h1>
        Ja<span css={highlight}>mmm</span>ing
      </h1>
      <div css={app}>
        <SearchBar />
        <div css={app_playlist}>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
