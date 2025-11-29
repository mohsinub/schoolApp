'use client';

import React, { memo, useMemo } from 'react';

function FilterBar({ students, onFilterChange, currentFilters = {} }) {
  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const grades = [...new Set(students.map((s) => s.grade))].filter(Boolean).sort();
    const countries = [...new Set(students.map((s) => s.residingCountry))].filter(Boolean).sort();
    const fathers = [...new Set(students.map((s) => s.fatherName))].filter(Boolean).sort();
    const mothers = [...new Set(students.map((s) => s.motherName))].filter(Boolean).sort();
    const statuses = ['Active', 'Quit', 'Application', 'TC Issued'];

    return { grades, countries, fathers, mothers, statuses };
  }, [students]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button
          onClick={() => onFilterChange({})}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Grade Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade
          </label>
          <select
            value={currentFilters.grade || ''}
            onChange={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                grade: e.target.value || undefined,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="">All Grades</option>
            {filterOptions.grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={currentFilters.residingCountry || ''}
            onChange={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                residingCountry: e.target.value || undefined,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="">All Countries</option>
            {filterOptions.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Father Name Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father Name
          </label>
          <select
            value={currentFilters.fatherName || ''}
            onChange={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                fatherName: e.target.value || undefined,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="">All Fathers</option>
            {filterOptions.fathers.map((father) => (
              <option key={father} value={father}>
                {father}
              </option>
            ))}
          </select>
        </div>

        {/* Mother Name Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother Name
          </label>
          <select
            value={currentFilters.motherName || ''}
            onChange={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                motherName: e.target.value || undefined,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="">All Mothers</option>
            {filterOptions.mothers.map((mother) => (
              <option key={mother} value={mother}>
                {mother}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={currentFilters.status || 'Active'}
            onChange={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                status: e.target.value || undefined,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="">All Status</option>
            {filterOptions.statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default memo(FilterBar);
