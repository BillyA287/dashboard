import { SortProps } from "@/app/types/types";

const Sort: React.FC<SortProps> = ({ sortKey, sortOrder, onSort }) => {
  const handleSort = (key: string) => {
    onSort(key);
  };

  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded ${
          sortKey === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleSort('name')}
      >
        Name {sortKey === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>
      <button
        className={`px-4 py-2 rounded ${
          sortKey === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleSort('email')}
      >
        Email {sortKey === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>
      <button
        className={`px-4 py-2 rounded ${
          sortKey === 'role' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleSort('role')}
      >
        Role {sortKey === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>
    </div>
  );
};

export default Sort;