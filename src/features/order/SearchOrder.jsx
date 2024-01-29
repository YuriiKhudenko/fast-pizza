import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, searchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    searchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    searchQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        className="w-40 rounded-full bg-yellow-100 px-3 py-2 text-sm transition-all duration-500 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-300 sm:w-64 sm:px-4 sm:focus:w-72"
        type="search"
        value={query}
        onChange={handleSearch}
      />
    </form>
  );
}

export default SearchOrder;
