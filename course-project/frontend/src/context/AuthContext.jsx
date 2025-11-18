"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({ user: null, token: null, login: async () => {}, logout: () => {} });
export const useAuth = () => useContext(AuthContext);

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (t) {
      setToken(t);
      const payload = parseJwt(t);
      if (payload) setUser(payload); // payload contains id + role 
    }
  }, []);

  const login = async (utorid, password) => {
    const res = await fetch('/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utorid, password })
    })

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || `Error ${res.status}: ${res.statusText}`);
    }

    const receivedToken = data.token;
    setToken(receivedToken);
    if (typeof window !== 'undefined') localStorage.setItem('token', receivedToken);

    const payload = parseJwt(receivedToken);
    setUser(payload || { utorid });

    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
