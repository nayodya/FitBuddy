import { User } from '../types';

// Dummy users database
const dummyUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
  },
];

export const authService = {
  // Mock login service
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = dummyUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword as User);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  // Mock registration service
  register: async (username: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = dummyUsers.find(u => u.email === email);
        if (existingUser) {
          reject(new Error('Email already registered'));
        } else {
          const newUser: User = {
            id: String(dummyUsers.length + 1),
            username,
            email,
          };
          dummyUsers.push({
            ...newUser,
            password,
          });
          resolve(newUser);
        }
      }, 1000);
    });
  },

  // Validate token (mock)
  validateToken: async (token: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would validate the token with backend
        const storedUser = localStorage.getItem('fitbuddy_user');
        resolve(storedUser ? JSON.parse(storedUser) : null);
      }, 500);
    });
  },
};
