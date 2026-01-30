import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'auth_token';
const PHONE_STORAGE_KEY = 'phone_number';

// Safely import and initialize MMKV storage instance
let MMKV;
try {
  MMKV = require('react-native-mmkv').MMKV;
} catch (error) {
  console.error('Failed to import MMKV:', error);
  MMKV = null;
}

// Initialize MMKV storage instance (lazy initialization)
const getStorage = () => {
  if (!MMKV) {
    // Fallback: create a mock storage object if MMKV is not available
    console.warn('MMKV not available, using in-memory storage');
    const memoryStorage = {};
    return {
      getString: (key) => memoryStorage[key],
      set: (key, value) => {
        memoryStorage[key] = value;
      },
      delete: (key) => {
        delete memoryStorage[key];
      },
    };
  }
  
  try {
    return new MMKV({
      id: 'postify-auth-storage',
    });
  } catch (error) {
    console.error('Failed to initialize MMKV:', error);
    // Fallback: create a mock storage object if MMKV fails
    const memoryStorage = {};
    return {
      getString: (key) => memoryStorage[key],
      set: (key, value) => {
        memoryStorage[key] = value;
      },
      delete: (key) => {
        delete memoryStorage[key];
      },
    };
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null);

  // Initialize storage once
  const storage = useMemo(() => getStorage(), []);

  // Check for persisted auth state on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = () => {
    try {
      const token = storage.getString(AUTH_STORAGE_KEY);
      const storedPhone = storage.getString(PHONE_STORAGE_KEY);
      
      if (token && storedPhone) {
        setIsAuthenticated(true);
        setPhoneNumber(storedPhone);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (phone, token = 'mock_token') => {
    try {
      storage.set(AUTH_STORAGE_KEY, token);
      storage.set(PHONE_STORAGE_KEY, phone);
      setIsAuthenticated(true);
      setPhoneNumber(phone);
      return { success: true };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Failed to save authentication state' };
    }
  };

  const logout = () => {
    try {
      storage.delete(AUTH_STORAGE_KEY);
      storage.delete(PHONE_STORAGE_KEY);
      setIsAuthenticated(false);
      setPhoneNumber(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    phoneNumber,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
