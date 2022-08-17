import { createContext, ReactNode, useState } from "react";

const initialValue = {
  token: localStorage.getItem("cappAccessToken"),
  setToken: () => { },
  deleteToken: () => { },
  refreshToken: localStorage.getItem("cappRefreshToken"),
  setRefreshToken: () => { },
  deleteRefreshToken: () => { },
  invalidateSession: () => { }
}

interface ContextType {
  token: string | null,
  setToken: (value: string) => void
  deleteToken: () => void,
  refreshToken: string | null,
  setRefreshToken: (value: string) => void,
  deleteRefreshToken: () => void,
  invalidateSession: () => void
}

export const AuthContext = createContext<ContextType>(initialValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(initialValue.token);
  const [refreshJwtToken, setRefreshJwtToken] = useState<string | null>(initialValue.refreshToken);

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

  const invalidateSession = () => {
    deleteToken();
    deleteRefreshToken();
  }
  
  return (
    <AuthContext.Provider value={{
      token, 
      setToken, 
      deleteToken,
      refreshToken, 
      setRefreshToken, 
      deleteRefreshToken,
      invalidateSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}