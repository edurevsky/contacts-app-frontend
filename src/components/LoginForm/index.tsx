import { AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../api";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import Container from "../Container";
import Form from "../Form";
import FormInput from "../Form/FormInput";
import "./loginform.css";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const { setToken, setRefreshToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { username, password }
    await loginService.post("", credentials)
      .then((res: AxiosResponse) => {
        setToken(res.headers.authorization);
        setRefreshToken(res.data.refreshToken);
        navigate("/");
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setError("User not found.");
        }
      });
  }

  return (
    <Container>
      <Form
        isModal={false}
        hasTitle="Login"
        onSubmit={handleLogin}
      >
        <small className="error">{error}</small>
        <FormInput
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        >
          Username
        </FormInput>
        <FormInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        >
          Password
        </FormInput>
        <div className="form-submit">
          <button>Login</button>
        </div>
      </Form>
    </Container>
  );
}

export default LoginForm;