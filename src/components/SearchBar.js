'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';

export default function SearchBar({ students, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return students
      .filter((student) => {
        const name = (student.name || '').toLowerCase();
        const rollNo = (student.rollNumber || '').toLowerCase();
        const phone = (student.phone || '').toLowerCase();
        const email = (student.email || '').toLowerCase();

        return name.includes(term) || rollNo.includes(term) || phone.includes(term) || email.includes(term);
      })
      .slice(0, 8); // Limit to 8 suggestions
  }, [searchTerm, students]);

  useEffect(() => {
    setSuggestions(searchResults);
  }, [searchResults]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (student) => {
    setSearchTerm(student.name);
    setShowSuggestions(false);
    onSearch(student.name);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            placeholder="Search by name, roll number, phone, or email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {suggestions.map((student) => (
                <button
                  key={student._id}
                  type="button"
                  onClick={() => handleSelectSuggestion(student)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 transition duration-150 border-b border-gray-200 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-600">
                    Roll: {student.rollNumber} | {student.grade} | {student.phone}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {showSuggestions && searchTerm && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-600">
              No students found
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
}
