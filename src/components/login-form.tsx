import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  FileWarning,
  LogIn,
  Shield,
  TriangleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps extends React.ComponentProps<"div"> {
  onLogin?: (credentials: { username: string; password: string }) => void;
}

export function LoginForm({ className, onLogin, ...props }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null)
    setIsLoading(true);

    const { username, password } = formData;
    if (username === "akashgupta" && password === "12345678") {
      localStorage.setItem("isAuthenticated", "true");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);
    } else {
      setError("Invalid Credential");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
      {/* Header Section */}
      <div className="flex flex-col items-start mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-base">
            Sign in to your administrator account
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500 px-2 py-1.5 rounded-md flex items-center gap-2">
            <TriangleAlert className="size-5 text-white" />
            <span className="text-sm text-white">{error}</span>
          </div>
        )}
        <div className="space-y-5">
          <div className="space-y-3">
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="h-12 transition-colors focus:border-primary border-gray-300"
              autoComplete="username"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="h-12 pr-12 transition-colors focus:border-primary border-gray-300"
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 hover:bg-gray-100"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold transition-all shadow-sm hover:shadow-md"
          disabled={isLoading || !formData.username || !formData.password}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </>
          )}
        </Button>

        {/* Additional Info */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-muted-foreground">
            Having trouble?{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Contact support
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
