/** @jsxImportSource @emotion/react */
import { TrackInfo, UpdateTracks } from '../../appTypes';
import Track from '../Track/Track';
import { trackList } from './TrackList-styles';

export interface TrackListProps {
  tracks: TrackInfo[];
  onAdd?: UpdateTracks;
  onRemove?: UpdateTracks;
  isRemoval?: boolean;
}

function TrackList({ tracks, onAdd, onRemove, isRemoval }: TrackListProps) {
  return (
    <div css={trackList}>
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

export default TrackList;
