import Wine from './Wine';
import SearchBar from './SearchBar';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const Wines = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {wines, handleDelete} = useOutletContext();

      const handleSearch = (e) => {
        setSearchQuery(e.target.value)
      }

      const finalWines = wines
      .filter(wine => {
        return (wine.name.toLowerCase().includes(searchQuery.toLowerCase()))
      })
      .map(wine => (<Wine key={wine.id} {...wine} handleDelete={handleDelete}/>))

    return (
        <main>
           <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
           <ul className="cards">{finalWines}</ul>
        </main>

    )
}

export default Wines;