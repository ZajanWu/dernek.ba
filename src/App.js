import { AuthProvider } from "lib/contexts/AuthContext";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
