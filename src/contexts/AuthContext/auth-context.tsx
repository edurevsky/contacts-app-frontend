import { createContext, ReactNode, useContext, useState } from "react";

const initialValue = {
  token: localStorage.getItem("cappAccessToken"),
  setToken: () => { },
  deleteToken: () => { },
  refreshToken: localStorage.getItem("cappRefreshToken"),
  setRefreshToken: () => { },
  deleteRefreshToken: () => { },
  invalidateSession: () => { },
  userId: localStorage.getItem("cappUserId"),
  setUserId: () => { },
  deleteUserId: () => { },
  isAuthenticated: () => false
}

interface ContextType {
  token: string | null,
  setToken: (value: string) => void
  deleteToken: () => void,
  refreshToken: string | null,
  setRefreshToken: (value: string) => void,
  deleteRefreshToken: () => void,
  invalidateSession: () => void,
  userId: string | null,
  setUserId: (value: string) => void,
  deleteUserId: () => void,
  isAuthenticated: () => boolean
}

export const AuthContext = createContext<ContextType>(initialValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(initialValue.token);
  const [refreshJwtToken, setRefreshJwtToken] = useState<string | null>(initialValue.refreshToken);
  const [appUserId, setAppUserId] = useState<string | null>(initialValue.userId);

  const token = jwtToken;

  const setToken = (value: string) => {
    setJwtToken(value);
    localStorage.setItem("cappAccessToken", value);
  }

  const deleteToken = () => {
    localStorage.removeItem("cappAccessToken");
    setJwtToken(null);
  }

  const refreshToken = refreshJwtToken;

  const setRefreshToken = (value: string) => {
    setRefreshJwtToken(value);
    localStorage.setItem("cappRefreshToken", value);
  }

  const deleteRefreshToken = () => {
    localStorage.removeItem("cappRefreshToken");
    setRefreshJwtToken(null);
  }

  const userId = appUserId;

  const setUserId = (value: string) => {
    setAppUserId(value);
    localStorage.setItem("cappUserId", value);
  }

  const deleteUserId = () => {
    localStorage.removeItem("cappUserId");
    setAppUserId(null);
  }

  const invalidateSession = () => {
    deleteToken();
    deleteRefreshToken();
  }

  const isAuthenticated = () => {
    return jwtToken != null && refreshJwtToken != null;
  }
  
  return (
    <AuthContext.Provider value={{
      token, 
      setToken, 
      deleteToken,
      refreshToken, 
      setRefreshToken, 
      deleteRefreshToken,
      userId,
      setUserId,
      deleteUserId,
      invalidateSession,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);