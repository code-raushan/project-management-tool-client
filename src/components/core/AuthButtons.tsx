// components/AuthButton.tsx
"use client";

import { LocalStorage } from "@/lib/localStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = LocalStorage.get("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("login", checkLoginStatus);
    window.addEventListener("logout", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("login", checkLoginStatus);
      window.removeEventListener("logout", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    LocalStorage.remove("token");
    window.dispatchEvent(new Event("logout"));
    toast({
      description: "Logged Out Successfully",
    });
    router.push("/login");
  };

  if (!isLoggedIn) {
    return (
      <Link href="/login" passHref>
        <Button variant="default">Login</Button>
      </Link>
    );
  }

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default AuthButton;
