import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extraChillAPI } from '../services/apiClient';

export interface User {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const checkAuthStatus = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Check for stored token
      const storedToken = await AsyncStorage.getItem('auth_token');

      if (storedToken) {
        // Set token in API client
        await extraChillAPI.setToken(storedToken);

        // Validate token with server (when server is ready)
        try {
          const response = await extraChillAPI.validateToken();

          if (response.success) {
            // Get user details
            const userResponse = await extraChillAPI.getUserDetails();

            setAuthState({
              user: userResponse.data as User,
              token: storedToken,
              isLoading: false,
              isAuthenticated: true,
            });
          } else {
            // Token invalid, clear it
            await clearAuthState();
          }
        } catch (error) {
          // Server not available yet, keep token for later
          console.log('Server validation not available, keeping stored token');
          setAuthState({
            user: null, // Will get user details when server is available
            token: storedToken,
            isLoading: false,
            isAuthenticated: true, // Assume valid for now
          });
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      await clearAuthState();
    }
  };

  const clearAuthState = async () => {
    await AsyncStorage.removeItem('auth_token');
    await extraChillAPI.clearToken();
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const login = async (username: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Development mode: Allow login with any valid username/password
      if (username.length >= 3 && password.length >= 6) {
        // Create mock user data
        const mockUser: User = {
          id: 1,
          username: username,
          email: `${username}@example.com`,
          firstName: username.charAt(0).toUpperCase() + username.slice(1),
          lastName: 'User',
        };

        const mockToken = `dev_token_${Date.now()}`;

        // Store token
        await AsyncStorage.setItem('auth_token', mockToken);
        await extraChillAPI.setToken(mockToken);

        setAuthState({
          user: mockUser,
          token: mockToken,
          isLoading: false,
          isAuthenticated: true,
        });

        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return {
          success: false,
          error: 'Please enter valid credentials (username: 3+ chars, password: 6+ chars)'
        };
      }

      // Real server login (commented out for development)
      /*
      const response = await extraChillAPI.login(username, password);

      if (response.success && response.data.token) {
        // Store token
        await AsyncStorage.setItem('auth_token', response.data.token);
        await extraChillAPI.setToken(response.data.token);

        // Get user details if available
        let user = null;
        try {
          const userResponse = await extraChillAPI.getUserDetails();
          user = userResponse.data;
        } catch (error) {
          console.log('User details not available yet');
        }

        setAuthState({
          user,
          token: response.data.token,
          isLoading: false,
          isAuthenticated: true,
        });

        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return {
          success: false,
          error: response.message || 'Login failed'
        };
      }
      */
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));

      return {
        success: false,
        error: error.message || 'Network error. Please try again.'
      };
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await clearAuthState();
    } catch (error) {
      console.error('Logout error:', error);
      // Clear state anyway
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};