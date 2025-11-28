import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./routes/AppRoutes";
import ErrorFallback from "./page-components/ErrorFallback";
import AuthProvider from "./contexts/AuthContext";
import UserProvider from "./contexts/UserProvider";

function App() {
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      <AuthProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
