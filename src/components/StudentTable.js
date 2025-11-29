'use client';

import React, { memo } from 'react';

function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No students found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Photo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Roll No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">WhatsApp</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Father</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mother</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Country</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Home Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">GCC Address</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr
                key={student._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 text-sm">
                  {student.photo ? (
                    <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                      {student.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.rollNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.grade}
                </td>
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
                        {student.status || 'no status'}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.whatsappNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.fatherName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.motherName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.residingCountry}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.homeAddress}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.gccAddress}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(student)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(student._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(StudentTable);
