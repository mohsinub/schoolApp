'use client';

import React, { useState, useEffect, useMemo } from 'react';

export default function AttendanceTracker({ studentId, studentName }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStatus, setSelectedStatus] = useState('Present');

  // Fetch attendance records
  useEffect(() => {
    fetchAttendance();
  }, [studentId]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/students/${studentId}/attendance`);
      const data = await response.json();
      if (data.success) {
        setAttendance(data.records || []);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const response = await fetch(`/api/students/${studentId}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, status: selectedStatus }),
      });

      const data = await response.json();
      if (data.success) {
        fetchAttendance();
        // Reset form
        setSelectedDate(new Date().toISOString().split('T')[0]);
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const handleDeleteAttendance = async (recordId) => {
    if (!confirm('Are you sure you want to delete this attendance record?')) return;

    try {
      const response = await fetch(`/api/students/${studentId}/attendance`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendanceId: recordId }),
      });

      const data = await response.json();
      if (data.success) {
        fetchAttendance();
      }
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = attendance.length;
    const present = attendance.filter((a) => a.status === 'Present').length;
    const absent = attendance.filter((a) => a.status === 'Absent').length;
    const leave = attendance.filter((a) => a.status === 'Leave').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

    return { total, present, absent, leave, percentage };
  }, [attendance]);

  const statusColor = {
    Present: 'bg-green-100 text-green-800',
    Absent: 'bg-red-100 text-red-800',
    Leave: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance Tracker - {studentName}</h3>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Present</p>
          <p className="text-2xl font-bold text-green-600">{stats.present}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Absent</p>
          <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Leave</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.leave}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Percentage</p>
          <p className="text-2xl font-bold text-purple-600">{stats.percentage}%</p>
        </div>
      </div>

      {/* Mark Attendance Form */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Mark Attendance</h4>
        <div className="flex gap-3 flex-wrap">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>

          <button
            onClick={handleMarkAttendance}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Records</h4>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : attendance.length === 0 ? (
          <div className="text-center text-gray-600">No attendance records yet</div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {attendance.map((record) => (
              <div
                key={record._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm text-gray-600">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[record.status]}`}>
                    {record.status}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteAttendance(record._id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
