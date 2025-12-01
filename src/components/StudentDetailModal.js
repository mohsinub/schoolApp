'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import AttendanceTracker from './AttendanceTracker';

function StudentDetailModal({ student, onClose }) {
  const [showAttendance, setShowAttendance] = useState(false);

  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-blue-100 text-sm">Roll No: {student.rollNumber} | Grade: {student.grade}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 flex">
          <button
            onClick={() => setShowAttendance(false)}
            className={`flex-1 py-3 font-medium text-center transition ${
              !showAttendance
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setShowAttendance(true)}
            className={`flex-1 py-3 font-medium text-center transition ${
              showAttendance
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Attendance
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showAttendance ? (
            // Details Tab
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-medium text-gray-900">{student.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grade</p>
                    <p className="font-medium text-gray-900">{student.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      {student.status || 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{student.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="font-medium text-gray-900">{student.whatsappNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{student.email || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Parents Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Parents Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Father Name</p>
                    <p className="font-medium text-gray-900">{student.fatherName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mother Name</p>
                    <p className="font-medium text-gray-900">{student.motherName || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Address Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Residing Country</p>
                    <p className="font-medium text-gray-900">{student.residingCountry || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Home Address</p>
                    <p className="font-medium text-gray-900 text-sm">{student.homeAddress || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">GCC Address</p>
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
