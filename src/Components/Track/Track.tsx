/** @jsxImportSource @emotion/react */
import { TrackInfo, UpdateTracks } from '../../appTypes';
import * as styles from './Track-styles';

interface TrackProps {
  isRemoval?: boolean;
  track: TrackInfo;
  onAdd?: UpdateTracks;
  onRemove?: UpdateTracks;
}

function Track({ isRemoval, track, onAdd, onRemove }: TrackProps) {
  function addTrack() {
    onAdd && onAdd(track);
  }

  function removeTrack() {
    onRemove && onRemove(track);
  }
  return (
    <div css={styles.track}>
      <div css={styles.track_information}>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {isRemoval ? (
        <button css={styles.track_action} onClick={removeTrack}>
          -
        </button>
      ) : (
        <button css={styles.track_action} onClick={addTrack}>
          +
        </button>
      )}
    </div>
  );
}

export default Track;
