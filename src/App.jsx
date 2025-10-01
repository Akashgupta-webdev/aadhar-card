import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./routes/AppRoutes";
import ErrorFallback from "./page-components/ErrorFallback";

function App() {
  const handleReset = () => {
    window.location.reload();
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
