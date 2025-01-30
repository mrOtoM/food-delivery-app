import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  };

  return (
    <form onSubmit={handelSubmit}>
      <input
        placeholder="Najst objednavku"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-36 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
