/** @jsxImportSource @emotion/react */
import { TrackInfo, UpdateTracks } from '../../appTypes';
import TrackList from '../TrackList/TrackList';
import { playlist, playlist_save } from './Playlist-styles';

interface PlaylistProps {
  playlistTracks: TrackInfo[];
  onRemove: UpdateTracks;
  onNameChange: (name: string) => void;
  onSave: () => void;
}

function Playlist({
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
}: PlaylistProps) {
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    onNameChange(e.target.value);
  }
  return (
    <div css={playlist}>
      <input defaultValue={'New Playlist'} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button css={playlist_save} onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
