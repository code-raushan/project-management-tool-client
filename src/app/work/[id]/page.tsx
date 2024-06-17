"use client";

import ActivitiesSheet from "@/components/core/ActivitiesSheet";
import { IWorks } from "@/components/core/WorksList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const { toast } = useToast();
  const [selectedWork, setSelectedWork] = useState<IWorks | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (id: string) => {
      await Interceptor.handleApi(
        async () => Work.getWorkDetails(id),
        setLoading,
        (res) => {
          const workDetails = res.data;
          setSelectedWork(workDetails);
        },
        () => {
          toast({
            description: "Failed to load the works",
          });
        }
      );
    };
    fetchData(id);
  }, [id, toast]);

  if (!selectedWork) {
    return <h1>Not found</h1>;
  }

  return (
    <main>
      <Card className="shadow-md cursor-pointer max-h-[10vh]">
        <div className="flex justify-between items-center px-4">
          <CardHeader className="flex-shrink-0">
            <CardTitle>{selectedWork.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <CardDescription>
              <p>
                <strong>Start Date:</strong> {selectedWork.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {selectedWork.endDate}
              </p>
            </CardDescription>
          </CardContent>
        </div>
      </Card>
      <div className="mt-4">
        <ActivitiesSheet workId={id} />
      </div>
    </main>
  );
}
