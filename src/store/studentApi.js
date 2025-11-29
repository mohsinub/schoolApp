import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  }),
  tagTypes: ['Students'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/api/students',
      providesTags: ['Students'],
      // Cache for 1 minute
      keepUnusedDataFor: 60,
    }),
    getStudentById: builder.query({
      query: (id) => `/api/students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Students', id }],
      keepUnusedDataFor: 60,
    }),
    createStudent: builder.mutation({
      query: (body) => ({
        url: '/api/students',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Students'],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/students/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Students', id }, 'Students'],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/api/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
