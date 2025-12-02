'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import AttendanceTracker from './AttendanceTracker';

function StudentDetailModal({ student, onClose }) {
  const [showAttendance, setShowAttendance] = useState(false);

  if (!student) return null;

  console.log('🎓 [StudentDetailModal] Student loaded:', { 
    id: student._id, 
    idType: typeof student._id,
    idString: String(student._id),
    name: student.name, 
    grade: student.grade 
  });

  // Determine status color
  const getStatusColor = (status) => {
    const statusMap = {
      'Active': 'bg-green-100 text-green-800',
      'Quit': 'bg-red-100 text-red-800',
      'Application': 'bg-blue-100 text-blue-800',
      'TC Issued': 'bg-purple-100 text-purple-800',
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6 flex justify-between items-start gap-4">
          <div className="flex gap-4 items-start flex-1">
            {student.photo && (
              <img
                src={student.photo}
                alt={student.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-white shadow-md"
              />
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{student.name}</h2>
              <div className="text-blue-100 text-xs sm:text-sm space-y-1 mt-2">
                <p>📚 Roll: {student.rollNumber} | Grade: {student.grade}</p>
                <p>📞 {student.phone || 'N/A'} {student.whatsappNumber && `| WhatsApp: ${student.whatsappNumber}`}</p>
                <p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status || 'Active')}`}>
                    {student.status || 'Active'}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 flex bg-gray-50">
          <button
            onClick={() => setShowAttendance(false)}
            className={`flex-1 py-2 sm:py-3 px-4 font-medium text-center text-sm sm:text-base transition ${
              !showAttendance
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 Details
          </button>
          <button
            onClick={() => setShowAttendance(true)}
            className={`flex-1 py-2 sm:py-3 px-4 font-medium text-center text-sm sm:text-base transition ${
              showAttendance
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📅 Attendance
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!showAttendance ? (
            // Details Tab - Compact grid layout
            <div className="space-y-3 sm:space-y-4">
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-blue-50 to-transparent rounded-lg p-3 sm:p-4 border border-blue-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>👤</span> Personal Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">Name</p>
                    <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">Roll</p>
                    <p className="font-medium text-gray-900 text-sm">{student.rollNumber}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">Grade</p>
                    <p className="font-medium text-gray-900 text-sm">{student.grade}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">Status</p>
                    <p className={`font-medium text-xs px-2 py-1 rounded ${getStatusColor(student.status || 'Active')}`}>
                      {student.status || 'Active'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-green-50 to-transparent rounded-lg p-3 sm:p-4 border border-green-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📱</span> Contact Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">Phone</p>
                    <p className="font-medium text-gray-900 text-sm">{student.phone || 'N/A'}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">WhatsApp</p>
                    <p className="font-medium text-gray-900 text-sm">{student.whatsappNumber || 'N/A'}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100 col-span-2 md:col-span-1">
                    <p className="text-xs text-gray-600 font-semibold">Email</p>
                    <p className="font-medium text-gray-900 text-sm truncate">{student.email || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Parents Information */}
              <div className="bg-gradient-to-br from-purple-50 to-transparent rounded-lg p-3 sm:p-4 border border-purple-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>👨‍👩‍👧</span> Parents Information
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">Father Name</p>
                    <p className="font-medium text-gray-900 text-sm">{student.fatherName || 'N/A'}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold">Mother Name</p>
                    <p className="font-medium text-gray-900 text-sm">{student.motherName || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-gradient-to-br from-orange-50 to-transparent rounded-lg p-3 sm:p-4 border border-orange-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🏠</span> Address Information
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Residing Country</p>
                    <p className="font-medium text-gray-900 text-sm">{student.residingCountry || 'N/A'}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Home Address</p>
                    <p className="font-medium text-gray-900 text-sm">{student.homeAddress || 'N/A'}</p>
                  </div>
                  <div className="bg-white rounded p-2 sm:p-3 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold mb-1">GCC Address</p>
                    <p className="font-medium text-gray-900 text-sm">{student.gccAddress || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Attendance Tab
            <AttendanceTracker studentId={student._id} studentName={student.name} />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(StudentDetailModal);
