/** @jsxImportSource @emotion/react */
import { searchBar, searchButton } from './SearchBar-styles';

function SearchBar() {
  return (
    <div css={searchBar}>
      <input placeholder='Enter A Song, Album, or Artist' />
      <button css={searchButton}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
