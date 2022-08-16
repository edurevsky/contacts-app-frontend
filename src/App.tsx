import { AuthProvider } from "./contexts/AuthContext/auth-context";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <AuthProvider>
      <AppPage />
    </AuthProvider>
  )
}

export default App;
