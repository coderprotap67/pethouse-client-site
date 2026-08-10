'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const checkUser = async () => {
      // 1. Google Session Sync
      if (session?.user) {
        setUser({
          name: session.user.name,
          email: session.user.email,
          photoURL: session.user.image,
        });

        try {
          // Exchange Google session for a valid JWT Token
          const res = await api.post('/api/jwt', {
            name: session.user.name,
            email: session.user.email
          });
          if (res.data?.token) {
            localStorage.setItem('token', res.data.token);
          }
        } catch (e) {
          console.error("JWT sync error:", e);
        }
        setLoading(false);
        return;
      }

      // 2. Custom Login Check
      if (!isPending) {
        try {
          const res = await api.get('/api/user-me');
          if (res.data?.user) {
            setUser(res.data.user);
          } else {
            setUser(null);
          }
        } catch (err) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    };

    checkUser();
  }, [session, isPending]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/login', { email, password });
      if (res.data.success) {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
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
      await authClient.signOut();
      await api.post('/api/logout');
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);