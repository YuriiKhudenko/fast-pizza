import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, searchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    searchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    searchQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        type="search"
        value={query}
        onChange={handleSearch}
      />
    </form>
  );
}

export default SearchOrder;
