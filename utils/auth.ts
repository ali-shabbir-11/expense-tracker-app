import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const authenticate = async (email: string, password: string, mode: 'signUp' | 'signInWithPassword') => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  const expiresIn = response.data.expiresIn;
  const refreshToken = response.data.refreshToken;
  const expiresInDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
  const user = {
    token,
    expiresInDate,
    refreshToken,
  };
  await AsyncStorage.setItem('userData', JSON.stringify(user));
  return token;
};

export const refreshToken = async (refreshToken: string) => {
  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
  const response = await axios.post(url, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const token = response.data.idToken;
  const expiresIn = response.data.expiresIn;
  const expiresInDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
  const user = {
    token,
    expiresInDate,
  };
  await AsyncStorage.setItem('userData', JSON.stringify(user));
  return token;
};

export const createUser =  (email: string, password: string) => {
  return authenticate(email, password, 'signUp');
};

export const login = (email: string, password: string) => {
  return authenticate(email, password, 'signInWithPassword');
};