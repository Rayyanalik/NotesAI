import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Types for our authentication context
interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Storage keys
const USER_STORAGE_KEY = 'user_data';

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    loadUserFromStorage();
  }, []);

  // Simple auth methods for demo purposes
  const login = async (email: string, password: string) => {
    // For demo, we're just checking if email and password are provided
    // In a real app, you would verify these credentials with a backend service
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    // Simulate loading
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user
      const user: User = {
        id: Date.now().toString(),
        email,
        username: email.split('@')[0],
      };
      
      // Store in localStorage and state
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      setUser(user);
      toast.success(`Welcome back, ${user.username}!`);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    if (!email || !password || !username) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user
      const user: User = {
        id: Date.now().toString(),
        email,
        username,
      };
      
      // Store in localStorage and state
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      setUser(user);
      toast.success(`Welcome, ${username}!`);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);