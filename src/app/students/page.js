'use client';

import StudentList from '@/components/StudentList';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function StudentsPage() {
  return (
    <ProtectedRoute>
      <StudentList />
    </ProtectedRoute>
  );
}
