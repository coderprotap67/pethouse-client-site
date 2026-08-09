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
      if (session?.user) {
        setUser({
          name: session.user.name,
          email: session.user.email,
          photoURL: session.user.image,
        });
        setLoading(false);
        return;
      }
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

  const loginWithGoogle = async (googleData) => {
    try {
      const res = await api.post('/api/google-login', googleData);
      if (res.data.success) {
        setUser(res.data.user);
        return res.data;
      } else {
        throw new Error(res.data.message || 'Google authentication failed');
      }
    } catch (err) {
      console.error("Google Login Error in Context:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
      await api.post('/api/logout');
      setUser(null);
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);