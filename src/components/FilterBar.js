'use client';

import { useAuth } from '@/contexts/AuthContext';
import React, { memo, useMemo } from 'react';

function FilterBar({ students, onFilterChange, currentFilters = {} }) {
  const user = useAuth();
  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const grades = [...new Set(students.map((s) => s.grade))].filter(Boolean).sort();
    const divisions = [...new Set(students.map((s) => s.division))].filter(Boolean).sort();
    const countries = [...new Set(students.map((s) => s.residingCountry))].filter(Boolean).sort();
    const statuses = ['Active', 'Quit', 'Application', 'TC Issued'];

    return { grades, divisions, countries, statuses };
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

        {/* Division Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Division
          </label>
          <select
            value={currentFilters.division || ''}
            onChange={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                division: e.target.value || undefined,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="">All Divisions</option>
            {filterOptions.divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        {/* <div>
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
        </div> */}

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={currentFilters.status || ''}
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
