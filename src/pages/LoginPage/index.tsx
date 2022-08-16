import { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { loginService } from "../../api";
import { AuthContext } from "../../contexts/AuthContext/auth-context";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setToken } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { username, password }
    await loginService.post("", credentials)
      .then((res: AxiosResponse) => {
        setToken(res.headers.authorization);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          alert("Bad credentials");
        }
      });
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  );
}

export default LoginPage;