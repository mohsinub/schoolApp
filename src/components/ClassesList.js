'use client';

import React, { useMemo, memo } from 'react';
import Link from 'next/link';

function ClassesList({ students }) {
  const { classes, stats } = useMemo(() => {
    const gradeMap = {};
    let totalStudents = 0;
    let totalActive = 0;
    let totalQuit = 0;
    let totalApplication = 0;
    let totalTcIssued = 0;
    
    students.forEach((student) => {
      const grade = student.grade || 'Unknown';
      if (!gradeMap[grade]) {
        gradeMap[grade] = {
          name: grade,
          total: 0,
          active: 0,
          quit: 0,
          application: 0,
          tcIssued: 0,
        };
      }
      gradeMap[grade].total += 1;
      totalStudents += 1;
      
      if (student.status === 'Active') {
        gradeMap[grade].active += 1;
        totalActive += 1;
      } else if (student.status === 'Quit') {
        gradeMap[grade].quit += 1;
        totalQuit += 1;
      } else if (student.status === 'Application') {
        gradeMap[grade].application += 1;
        totalApplication += 1;
      } else if (student.status === 'TC Issued') {
        gradeMap[grade].tcIssued += 1;
        totalTcIssued += 1;
      }
    });

    const classList = Object.values(gradeMap).sort((a, b) => {
      const orderMap = {
        'KG1': 1, 'KG2': 2,
        'Grade 1': 3, 'Grade 2': 4, 'Grade 3': 5, 'Grade 4': 6,
        'Grade 5': 7, 'Grade 6': 8, 'Grade 7': 9, 'Grade 8': 10,
      };
      return (orderMap[a.name] || 999) - (orderMap[b.name] || 999);
    });

    return {
      classes: classList,
      stats: {
        totalStudents,
        totalActive,
        totalQuit,
        totalApplication,
        totalTcIssued,
      },
    };
  }, [students]);

  return (
    <div className="space-y-8">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-medium text-blue-100 mb-2">Total Students</div>
          <div className="text-4xl font-bold">{stats.totalStudents}</div>
          <div className="text-xs text-blue-200 mt-2">All students</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-medium text-green-100 mb-2">Active</div>
          <div className="text-4xl font-bold">{stats.totalActive}</div>
          <div className="text-xs text-green-200 mt-2">Currently enrolled</div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-medium text-red-100 mb-2">Quit</div>
          <div className="text-4xl font-bold">{stats.totalQuit}</div>
          <div className="text-xs text-red-200 mt-2">Left school</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-medium text-yellow-100 mb-2">Application</div>
          <div className="text-4xl font-bold">{stats.totalApplication}</div>
          <div className="text-xs text-yellow-200 mt-2">Pending</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-medium text-purple-100 mb-2">TC Issued</div>
          <div className="text-4xl font-bold">{stats.totalTcIssued}</div>
          <div className="text-xs text-purple-200 mt-2">Transferred</div>
        </div>
      </div>

      {/* Status Distribution Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Student Status Distribution</h3>
        <div className="flex gap-2 h-8 rounded-full overflow-hidden bg-gray-200">
          {stats.totalStudents > 0 && (
            <>
              {stats.totalActive > 0 && (
                <div
                  className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${(stats.totalActive / stats.totalStudents) * 100}%` }}
                  title={`Active: ${stats.totalActive}`}
                >
                  {(stats.totalActive / stats.totalStudents) * 100 > 10 && `${stats.totalActive}`}
                </div>
              )}
              {stats.totalQuit > 0 && (
                <div
                  className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${(stats.totalQuit / stats.totalStudents) * 100}%` }}
                  title={`Quit: ${stats.totalQuit}`}
                >
                  {(stats.totalQuit / stats.totalStudents) * 100 > 10 && `${stats.totalQuit}`}
                </div>
              )}
              {stats.totalApplication > 0 && (
                <div
                  className="bg-yellow-500 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${(stats.totalApplication / stats.totalStudents) * 100}%` }}
                  title={`Application: ${stats.totalApplication}`}
                >
                  {(stats.totalApplication / stats.totalStudents) * 100 > 10 && `${stats.totalApplication}`}
                </div>
              )}
              {stats.totalTcIssued > 0 && (
                <div
                  className="bg-purple-500 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${(stats.totalTcIssued / stats.totalStudents) * 100}%` }}
                  title={`TC Issued: ${stats.totalTcIssued}`}
                >
                  {(stats.totalTcIssued / stats.totalStudents) * 100 > 10 && `${stats.totalTcIssued}`}
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Active: {stats.totalActive} ({((stats.totalActive / stats.totalStudents) * 100).toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Quit: {stats.totalQuit} ({((stats.totalQuit / stats.totalStudents) * 100).toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Application: {stats.totalApplication} ({((stats.totalApplication / stats.totalStudents) * 100).toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>TC Issued: {stats.totalTcIssued} ({((stats.totalTcIssued / stats.totalStudents) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Classes Overview</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {classes.map((cls) => (
              <Link
                key={cls.name}
                href={`/class/${encodeURIComponent(cls.name)}`}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-blue-200 hover:border-blue-400 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
                  <div className="text-3xl">🏫</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Students:</span>
                    <span className="font-bold text-lg text-blue-600">{cls.total}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-200">
                    <div className="text-center p-2 bg-white rounded">
                      <div className="text-xs text-gray-600">Active</div>
                      <div className="font-bold text-green-600">{cls.active}</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="text-xs text-gray-600">Quit</div>
                      <div className="font-bold text-red-600">{cls.quit}</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="text-xs text-gray-600">Application</div>
                      <div className="font-bold text-yellow-600">{cls.application}</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="text-xs text-gray-600">TC Issued</div>
                      <div className="font-bold text-blue-600">{cls.tcIssued}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="text-center text-blue-600 font-semibold text-sm hover:text-blue-700">
                    View Class →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ClassesList);
