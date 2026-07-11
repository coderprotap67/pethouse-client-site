'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get('/user-me');
        if (res.data.user) setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);
  const login = async (email, password) => {
    try {
      const res = await api.post('/login', { email, password });
      
      if (res.data.success) {
        setUser(res.data.user);
        return res.data;
      } else {
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error("AuthContext Login Error:", err);
      throw err; 
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);