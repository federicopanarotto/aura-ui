import { createContext, useContext } from "react";
import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../shared/interfaces/user/User";
import { useLogout } from "../shared/api/auth/useLogout";
import { useMe } from "../shared/api/user/useMe";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  refetch: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: me, isSuccess, isLoading: isMeLoading, error, refetch } = useMe();
  const { mutate: logoutMutation } = useLogout();

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    logoutMutation();
  };

  useEffect(() => {
    setIsLoading(true);
    if (isSuccess && me) {
      setUser(me);
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    if (error) {
      logout();
      setIsLoading(false);
      return;
    }

    if (!isMeLoading) {
      setIsLoading(false);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isSuccess, error, isMeLoading, me]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
