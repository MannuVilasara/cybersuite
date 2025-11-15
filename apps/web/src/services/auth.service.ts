import axios from 'axios';
import { env } from '@/lib/env';

export interface User {
  _id: string;
  email: string;
  username: string;
  name?: string;
  role: 'user' | 'admin' | 'serviceProvider';
  emailVerified?: boolean;
  verified?: boolean;
  createdAt?: string;
  loginHistory?: any[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

interface RegisterResponse {
  user: User;
  token: string;
  message?: string;
}

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const { data } = await axios.post(`${env.API_URL}/user/login`, credentials, {
      withCredentials: true,
    });
    return data;
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse> {
    const { data } = await axios.post(`${env.API_URL}/user/signup`, userData, {
      withCredentials: true,
    });
    return data;
  },

  logout: async (): Promise<void> => {
    await axios.get(`${env.API_URL}/user/logout`, {
      withCredentials: true,
    });
  },

  getProfile: async (): Promise<AuthResponse['user']> => {
    const res = await axios.get(`${env.API_URL}/user/profile`, {
      withCredentials: true,
    });
    return res.data;
  },

  sendOTP: async (email: string): Promise<{ message: string }> => {
    const res = await axios.post(`${env.API_URL}/user/send-otp`, { email }, {
      withCredentials: true,
    });
    return res.data;
  },

  verifyOTP: async (email: string, otp: string): Promise<{ message: string }> => {
    const res = await axios.post(`${env.API_URL}/user/verify-otp`, { email, otp }, {
      withCredentials: true,
    });
    return res.data;
  },
};
