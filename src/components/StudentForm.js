'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import { useUpdateStudentMutation } from '@/store/studentApi';

function StudentForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    grade: 'KG1',
    phone: '',
    whatsappNumber: '',
    email: '',
    rollNumber: '',
    fatherName: '',
    motherName: '',
    residingCountry: 'GCC',
    homeAddress: '',
    gccAddress: '',
    photo: null,
    status: 'Active',
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const [updateStudent] = useUpdateStudentMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        grade: initialData.grade || 'KG1',
        phone: initialData.phone || '',
        whatsappNumber: initialData.whatsappNumber || '',
        email: initialData.email || '',
        rollNumber: initialData.rollNumber || '',
        fatherName: initialData.fatherName || '',
        motherName: initialData.motherName || '',
        residingCountry: initialData.residingCountry || 'GCC',
        homeAddress: initialData.homeAddress || '',
        gccAddress: initialData.gccAddress || '',
        photo: null,
        status: initialData.status || 'Active',
      });
      if (initialData.photo) {
        setPhotoPreview(initialData.photo);
      }
    }
  }, [initialData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (initialData?._id) {
        // When updating, only include photo if a new one was uploaded
        const dataToUpdate = { ...formData };
        if (!formData.photo) {
          // Keep existing photo if no new photo uploaded
          dataToUpdate.photo = initialData.photo;
        }
        await updateStudent({
          id: initialData._id,
          ...dataToUpdate,
        }).unwrap();
      } else {
        await onSubmit(formData);
      }
      setFormData({
        name: '',
        grade: 'KG1',
        phone: '',
        whatsappNumber: '',
        email: '',
        rollNumber: '',
        fatherName: '',
        motherName: '',
        residingCountry: 'GCC',
        homeAddress: '',
        gccAddress: '',
        photo: null,
        status: 'Active',
      });
      setPhotoPreview(null);
      onCancel();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="Enter student name"
          />
        </div>

            <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option>KG1</option>
            <option>KG2</option>
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
        
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="Active">Active</option>
            <option value="Quit">Quit</option>
            <option value="Application">Application</option>
            <option value="TC Issued">TC Issued</option>
          </select>
        </div>
        

              <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="+1-234-567-8900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="+1-234-567-8900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Father Name
          </label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="Father's name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mother Name
          </label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="Mother's name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Residing Country
          </label>
          <select
            name="residingCountry"
            value={formData.residingCountry}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            <option value="UAE">UAE</option>
            <option value="SAUDI ARABIA">SAUDI ARABIA</option>
            <option value="KUWAIT">KUWAIT</option>
            <option value="BAHRAIN">BAHRAIN</option>
            <option value="OMAN">OMAN</option>
            <option value="QATAR">QATAR</option>
            <option value="INDIA">INDIA</option>
            <option value="Other">Other</option>
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="student@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Home Address
          </label>
          <textarea
            type="text"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="Home address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GCC/Current Address
          </label>
          <textarea
            type="text"
            name="gccAddress"
            value={formData.gccAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="GCC or current address"
          />
        </div>


  

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roll Number
          </label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            placeholder="A101"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Photo
          </label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">JPG, PNG (Max 5MB)</p>
            </div>
            {photoPreview && (
              <div className="shrink-0">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>

    
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Student' : 'Create Student'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default memo(StudentForm);
