export type TrackInfo = {
  name: string;
  artist: string;
  album: string;
  id: string;
}

export type UpdateTracks = (
  track: TrackInfo
) => void;

