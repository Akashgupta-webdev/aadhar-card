import { Cpu, GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";

export default function LoginPage() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated === "true") {
      navigate("/");
    } else {
      setPageLoading(false);
    }
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center gap-2.5">
        <Loader size="lg" />
        <div className="flex items-center">
          <span className="text-xl font-semibold text-slate-800">Cyberworld</span>
          <Cpu className="w-12 -translate-x-1 text-slate-800"/>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Cyber World
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/login-page-image.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
