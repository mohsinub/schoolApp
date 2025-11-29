'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">School Management System</h1>
          <p className="text-xl text-blue-100">Manage students efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dashboard Card */}
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

          {/* Students List Card */}
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

        <div className="mt-12 bg-white bg-opacity-10 rounded-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Quick Features:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <li className="flex items-center">
              <span className="mr-3">✓</span> Add new students with comprehensive information
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span> Upload and manage student photos
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span> Track students by grade and country
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span> Edit and update student details
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span> Delete student records
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span> View real-time statistics
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

