import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { users } from '../data/users';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Partial<User>) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]); // Default to first user for demo
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (email: string, password: string) => {
    // Admin login
    if (email === 'admin@sdpkits.com' && password === 'admin123') {
      setIsAdmin(true);
      setCurrentUser({
        id: 'admin-001',
        name: 'Admin User',
        email: 'admin@sdpkits.com',
        phone: '+1 (555) 000-0000',
        address: {
          street: '123 Admin St',
          city: 'Admin City',
          state: 'AC',
          zipCode: '00000',
          country: 'USA'
        },
        registrationDate: '2023-01-01',
        totalOrders: 0
      });
      return true;
    }

    // Regular user login
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsAdmin(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const register = (userData: Partial<User>) => {
    // Simple registration logic for demo
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      },
      registrationDate: new Date().toISOString(),
      totalOrders: 0
    };
    
    setCurrentUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAdmin,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};