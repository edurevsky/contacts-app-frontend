import { AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { loginService } from "../../api";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import "./loginform.css";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const { setToken, setRefreshToken } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { username, password }
    await loginService.post("", credentials)
      .then((res: AxiosResponse) => {
        setToken(res.headers.authorization);
        setRefreshToken(res.data.refreshToken);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setError("User not found.");
        }
      });
  }

  return (
    <div className="form-container">
      <h1>Please Login</h1>
      <small className="error">{error}</small>
      <form
        className="login-form"
        onSubmit={handleLogin}
      >
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-submit">
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;