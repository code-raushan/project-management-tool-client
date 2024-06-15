"use client";

import { LocalStorage } from "@/lib/localStorage";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = LocalStorage.get("token");
      if (!token) {
        toast({
          title: "Session Expired",
          description: "Please login again",
        });
        router.push("/login"); // Redirect to login if no token is found
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] min-w-[100vw]">
        <LoaderIcon size={24} className="animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
