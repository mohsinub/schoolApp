'use client';

import React, { useMemo, useState } from 'react';

export default function Dashboard({ students, onViewStudents }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const stats = useMemo(() => {
    const totalStudents = students.length;

    // Grade-wise count
    const gradeWise = {};
    students.forEach((student) => {
      const grade = student.grade || 'Unknown';
      gradeWise[grade] = (gradeWise[grade] || 0) + 1;
    });

    // Country-wise count
    const countryWise = {};
    students.forEach((student) => {
      const country = student.residingCountry || 'Unknown';
      countryWise[country] = (countryWise[country] || 0) + 1;
    });

    return {
      totalStudents,
      gradeWise: Object.entries(gradeWise).sort(),
      countryWise: Object.entries(countryWise).sort(),
    };
  }, [students]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h2>

      {/* Total Students Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {stats.totalStudents}
              </p>
            </div>
            <div className="text-5xl text-blue-200">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Grades</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {stats.gradeWise.length}
              </p>
            </div>
            <div className="text-5xl text-green-200">📚</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Countries</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">
                {stats.countryWise.length}
              </p>
            </div>
            <div className="text-5xl text-purple-200">🌍</div>
          </div>
        </div>
      </div>

      {/* Grade-wise and Country-wise Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Grade-wise Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Students by Grade</h3>
          <div className="space-y-4">
            {stats.gradeWise.map(([grade, count]) => (
              <div key={grade}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{grade}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(count / stats.totalStudents) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Country-wise Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Students by Country</h3>
          <div className="space-y-4">
            {stats.countryWise.map(([country, count]) => (
              <div key={country}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{country}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(count / stats.totalStudents) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
