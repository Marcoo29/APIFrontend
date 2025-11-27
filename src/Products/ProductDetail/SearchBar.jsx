export default function SearchBar({ searchTerm, setSearchTerm, navigate }) {
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm bg-white"
        />
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
          search
        </span>
      </div>
    </div>
  );
}
