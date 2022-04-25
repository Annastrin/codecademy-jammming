/** @jsxImportSource @emotion/react */
import { TrackInfo, UpdateTracks } from '../../appTypes';
import TrackList from '../TrackList/TrackList';
import { search_results } from './SearchResults-styles';

interface SearchResultsProps {
  searchResults: TrackInfo[];
  onAdd: UpdateTracks;
}

function SearchResults({ searchResults, onAdd }: SearchResultsProps) {
  return (
    <div css={search_results}>
      <h2>Results</h2>
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
}

export default SearchResults;
