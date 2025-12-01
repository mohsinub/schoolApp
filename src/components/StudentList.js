'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useGetStudentsQuery, useCreateStudentMutation, useDeleteStudentMutation } from '@/store/studentApi';
import { useAuth } from '@/contexts/AuthContext';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';
import Dashboard from './Dashboard';
import FilterBar from './FilterBar';

export default function StudentList() {
  const { user } = useAuth();
  const { data: students = [], isLoading, error } = useGetStudentsQuery();
  const [createStudent] = useCreateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [filters, setFilters] = useState({ status: 'Active' });

  // Optimized filter logic with role-based filtering
  const filteredStudents = useMemo(() => {
    let baseStudents = students;
    
    // Filter by teacher's classes if teacher
    if (user.role === 'teacher') {
      baseStudents = students.filter((s) => user.teacherClasses.includes(s.grade));
    }

    return baseStudents.filter((student) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return student[key] === value;
      });
    });
  }, [students, filters, user]);

  const handleSubmit = async (formData) => {
    try {      
      await createStudent(formData).unwrap();
      setShowForm(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id).unwrap();
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  const handleEdit = useCallback((student) => {
    setEditingStudent(student);    
    setShowForm(true);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Loading students...</div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-screen mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <button
            onClick={() => {
              setEditingStudent(null);
              setShowForm(!showForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            {showForm ? 'Cancel' : 'Add Student'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <StudentForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingStudent(null);
              }}
              initialData={editingStudent}
            />
          </div>
        )}

        <FilterBar students={students} onFilterChange={setFilters} currentFilters={filters} />

        <StudentTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
