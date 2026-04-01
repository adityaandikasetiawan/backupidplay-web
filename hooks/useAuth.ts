import { useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  is_email_verified: number;
  full_name: string;
  last_login: string;
  task_id: string[];
  total_points: number;
  total_ads_watched: number;
  login_day_streak: number;
  subscription_status: string;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const loginStatus = localStorage.getItem("isLoggedIn");

        if (userData && token && loginStatus === "true") {
          const userObj = JSON.parse(userData);
          setUser(userObj);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "token" || e.key === "isLoggedIn") {
        checkAuthStatus();
      }
    };

    // Listen for same-tab auth changes via custom event
    const handleAuthChanged = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:changed', handleAuthChanged as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:changed', handleAuthChanged as EventListener);
    };
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    localStorage.setItem("isLoggedIn", "true");
    setUser(userData);
    setIsLoggedIn(true);
    // notify other hook instances in the same tab
    window.dispatchEvent(new Event('auth:changed'));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('auth:changed'));
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event('auth:changed'));
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateUser,
  };
};

