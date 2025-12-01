'use client';

import React, { useMemo } from 'react';
import { useGetStudentsQuery } from '@/store/studentApi';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function AdminDashboard({ students }) {
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter((s) => s.status === 'Active').length;
    const quitStudents = students.filter((s) => s.status === 'Quit').length;
    const applicationStudents = students.filter((s) => s.status === 'Application').length;
    const tcIssuedStudents = students.filter((s) => s.status === 'TC Issued').length;

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
      activeStudents,
      quitStudents,
      applicationStudents,
      tcIssuedStudents,
      gradeWise: Object.entries(gradeWise).sort(),
      countryWise: Object.entries(countryWise).sort(),
    };
  }, [students]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of all students and classes</p>
          </div>
          <Link
            href="/students"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Manage Students
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Total Students</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Active</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{stats.activeStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium">Quit</p>
            <p className="text-4xl font-bold text-red-600 mt-2">{stats.quitStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm font-medium">Application</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.applicationStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium">TC Issued</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">{stats.tcIssuedStudents}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Grade Distribution */}
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
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(count / stats.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Country Distribution */}
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
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(count / stats.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard({ students, teacherClasses }) {
  const filteredStudents = useMemo(() => {
    return students.filter((s) => teacherClasses.includes(s.grade));
  }, [students, teacherClasses]);

  const stats = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const activeStudents = filteredStudents.filter((s) => s.status === 'Active').length;
    const quitStudents = filteredStudents.filter((s) => s.status === 'Quit').length;
    const applicationStudents = filteredStudents.filter((s) => s.status === 'Application').length;
    const tcIssuedStudents = filteredStudents.filter((s) => s.status === 'TC Issued').length;

    // Grade-wise for assigned classes
    const gradeWise = {};
    filteredStudents.forEach((student) => {
      const grade = student.grade || 'Unknown';
      gradeWise[grade] = (gradeWise[grade] || 0) + 1;
    });

    return {
      totalStudents,
      activeStudents,
      quitStudents,
      applicationStudents,
      tcIssuedStudents,
      gradeWise: Object.entries(gradeWise).sort(),
      assignedClasses: teacherClasses.length,
    };
  }, [filteredStudents, teacherClasses]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Your Classes: {teacherClasses.join(', ')}</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Total Students</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Active</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{stats.activeStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium">Quit</p>
            <p className="text-4xl font-bold text-red-600 mt-2">{stats.quitStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm font-medium">Application</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.applicationStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium">TC Issued</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">{stats.tcIssuedStudents}</p>
          </div>
        </div>

        {/* Class Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Students by Your Classes</h3>
          <div className="space-y-4">
            {stats.gradeWise.map(([grade, count]) => (
              <div key={grade}>
                <div className="flex justify-between items-center mb-2">
                  <Link
                    href={`/class/${encodeURIComponent(grade)}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {grade}
                  </Link>
                  <span className="text-sm font-bold text-gray-900">{count} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${(count / stats.totalStudents) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/students"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Manage Students in My Classes
          </Link>
          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const { data: students = [], isLoading, error } = useGetStudentsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-600">Error loading students: {error.message}</div>
      </div>
    );
  }

  return user.role === 'admin' ? (
    <AdminDashboard students={students} />
  ) : (
    <TeacherDashboard students={students} teacherClasses={user.teacherClasses} />
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
