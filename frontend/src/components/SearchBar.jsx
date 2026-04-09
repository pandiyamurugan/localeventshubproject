export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search coins..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
