/** @jsxImportSource @emotion/react */
import { TrackInfo, UpdateTracks } from '../../appTypes';
import TrackList from '../TrackList/TrackList';
import { playlist, playlist_save } from './Playlist-styles';

interface PlaylistProps {
  playlistName: string;
  playlistTracks: TrackInfo[];
  onRemove: UpdateTracks;
}

function Playlist({ playlistName, playlistTracks, onRemove }: PlaylistProps) {
  return (
    <div css={playlist}>
      <input defaultValue={'New Playlist'} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button css={playlist_save}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
