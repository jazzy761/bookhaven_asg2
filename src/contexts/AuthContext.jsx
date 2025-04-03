import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: 'Test User',
          email: email
        };
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        resolve(true);
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: name,
          email: email
        };
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 