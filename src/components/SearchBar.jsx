
const SearchBar = ({handleSearch, searchQuery}) => {
    return (
        <div className="searchbar">
          <label htmlFor="search">Search Wines:</label>
          <input
            type="text"
            id="search"
            placeholder="Type a name to search..."
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>
      );
}

export default SearchBar;
