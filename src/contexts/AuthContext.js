'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('schoolAppUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('schoolAppUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Dummy authentication
    const dummyUsers = {
      'admin@school.com': {
        email: 'admin@school.com',
        password: 'admin',
        name: 'Admin User',
        role: 'admin',
        teacherClasses: [], // Admin sees all
      },
      'teacher@school.com': {
        email: 'teacher@school.com',
        password: 'teacher',
        name: 'Teacher User',
        role: 'teacher',
        teacherClasses: ['KG1', 'KG2', 'Grade 1', 'Grade 2'], // Teacher sees these classes
      },
    };

    const foundUser = dummyUsers[email];
    if (foundUser && foundUser.password === password) {
      const userData = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        teacherClasses: foundUser.teacherClasses,
      };
      setUser(userData);
      localStorage.setItem('schoolAppUser', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolAppUser');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
