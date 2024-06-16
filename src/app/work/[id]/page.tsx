"use client";

import { IWorks } from "@/components/core/WorksList";
import { useToast } from "@/components/ui/use-toast";
import Work from "@/handlers/work";
import { Interceptor } from "@/lib/interceptor";
import { useEffect, useState } from "react";

export default function WorkDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [workDetails, setWorkDetails] = useState<IWorks>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      await Interceptor.handleApi(
        async () => Work.getWorkDetails(id),
        setLoading,
        (res) => {
          setWorkDetails(() => res.data);
        },
        () => {
          toast({
            description: "Failed to load the works",
          });
        }
      );
    };

    fetchData();
  }, []);
}
