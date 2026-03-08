import { refreshToken } from '@/utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: null as string | null,
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const user = JSON.parse(userData || '{}');
      if (user && user.token) {
        setAuthToken(user.token);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    const refreshTokenHandler = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const user = JSON.parse(userData || '{}');
      if (user && user.expiresInDate && user.expiresInDate < new Date()) {
        const token = await refreshToken(user.refreshToken);
        setAuthToken(token);
        AsyncStorage.setItem('userData', JSON.stringify({ token, expiresInDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7) }));
      }
    }
    refreshTokenHandler();
  }, []);

  const authenticate = (token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem('userData', JSON.stringify({ token, expiresInDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7) }));
  }

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('userData');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;