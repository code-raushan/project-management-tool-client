"use client";

import { LocalStorage } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function GoToDashboard() {
  const router = useRouter();
  const { toast } = useToast();

  const handleGoToDashboard = useCallback(() => {
    const token = LocalStorage.get("token");
    if (!token) {
      toast({
        description: "Login please",
      });
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);

  return (
    <Button variant="default" onClick={handleGoToDashboard}>
      Go to Dashboard
    </Button>
  );
}
