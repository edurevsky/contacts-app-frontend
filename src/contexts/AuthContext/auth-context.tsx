import { createContext, ReactNode, useState } from "react";

const initialValue = {
  token: localStorage.getItem("cappAccessToken"),
  setToken: () => { },
  deleteToken: () => { }
}

interface ContextType {
  token: string | null,
  setToken: (value: string) => void
  deleteToken: () => void
}

export const AuthContext = createContext<ContextType>(initialValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(initialValue.token);

  const token = jwtToken;

  const setToken = (value: string) => {
    setJwtToken(value);
    localStorage.setItem("cappAccessToken", value);
  }

  const deleteToken = () => {
    localStorage.removeItem("cappAccessToken");
  }
  
  return (
    <AuthContext.Provider value={{
      token, setToken, deleteToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}