'use client';

import React, { useMemo, memo, use } from 'react';
import Link from 'next/link';
import { useGetStudentsQuery } from '@/store/studentApi';

function ClassDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { grade } = resolvedParams;
  const { data: students = [], isLoading, error } = useGetStudentsQuery();

  const classData = useMemo(() => {
    const decodedGrade = decodeURIComponent(grade);
    const classStudents = students.filter((s) => s.grade === decodedGrade);
    
    const stats = {
      total: classStudents.length,
      active: classStudents.filter((s) => s.status === 'Active').length,
      quit: classStudents.filter((s) => s.status === 'Quit').length,
      application: classStudents.filter((s) => s.status === 'Application').length,
      tcIssued: classStudents.filter((s) => s.status === 'TC Issued').length,
    };

    return { grade: decodedGrade, students: classStudents, stats };
  }, [students, grade]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-600">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{classData.grade}</h1>
          <p className="text-gray-600">Class Details & Students</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600">Total Students</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{classData.stats.total}</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600">Active</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{classData.stats.active}</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600">Quit</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{classData.stats.quit}</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
            <div className="text-sm font-medium text-gray-600">Application</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{classData.stats.application}</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <div className="text-sm font-medium text-gray-600">TC Issued</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">{classData.stats.tcIssued}</div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">S.No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Roll Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">WhatsApp</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {classData.students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No students in this class
                    </td>
                  </tr>
                ) : (
                  classData.students.map((student, index) => (
                    <tr key={student._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.rollNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.whatsappNumber}</td>
                      <td className="px-6 py-4 text-sm">
                        {(() => {
                          const statusStyles = {
                            Active: 'bg-green-100 text-green-800',
                            Quit: 'bg-red-100 text-red-800',
                            Application: 'bg-yellow-100 text-yellow-800',
                            'TC Issued': 'bg-blue-100 text-blue-800',
                          };
                          return (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[student.status] || 'bg-gray-100 text-gray-800'}`}>
                              {student.status || 'Active'}
                            </span>
                          );
                        })()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Total Students:</span> {classData.stats.total}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Active Enrollment Rate:</span>{' '}
                {classData.stats.total > 0
                  ? ((classData.stats.active / classData.stats.total) * 100).toFixed(1)
                  : 0}
                %
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Attrition Rate:</span>{' '}
                {classData.stats.total > 0
                  ? ((classData.stats.quit / classData.stats.total) * 100).toFixed(1)
                  : 0}
                %
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Pending Applications:</span> {classData.stats.application}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ClassDetailsPage);
