/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { searchBar, searchButton } from './SearchBar-styles';

interface SearchBarProps {
  onSearch: (searchRequest: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchRequest, setSearchRequest] = useState('');

  function search() {
    onSearch(searchRequest);
  }

  function handleTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchRequest(e.target.value);
  }

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
    search();
  }

  return (
    <form css={searchBar} onSubmit={handleSearch}>
      <input
        placeholder='Enter A Song, Album, or Artist'
        onChange={handleTermChange}
      />
      <button css={searchButton} onClick={handleSearch}>
        SEARCH
      </button>
    </form>
  );
}

export default SearchBar;
