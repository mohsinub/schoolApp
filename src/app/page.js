'use client';

import Link from 'next/link';
import { useGetStudentsQuery } from '@/store/studentApi';
import ClassesList from '@/components/ClassesList';

export default function Home() {
  const { data: students = [], isLoading, error } = useGetStudentsQuery();

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
        <div className="text-lg text-red-600">Error loading data: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">School Management System</h1>
          <p className="text-xl text-blue-100">Manage students efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link href="/dashboard">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Dashboard</h2>
              <p className="text-gray-600 mb-4">
                View comprehensive statistics about students, grades, and countries.
              </p>
              <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
                View Dashboard
              </div>
            </div>
          </Link>

          <Link href="/students">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Students</h2>
              <p className="text-gray-600 mb-4">
                Create, view, edit, and delete student records. Manage all student information.
              </p>
              <div className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
                Manage Students
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Classes</h2>
          <ClassesList students={students} />
        </div>
      </div>
    </div>
  );
}

