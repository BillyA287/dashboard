import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search..." }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64 bg-gray-100 focus:bg-yellow-50 focus:border-yellow-400 transition-colors text-gray-900 placeholder-gray-500"
    aria-label="Search users"
  />
);

export default SearchBar;