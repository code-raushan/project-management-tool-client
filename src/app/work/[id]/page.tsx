"use client";

import ActivitiesSheet from "@/components/core/ActivitiesSheet";
import { IWorks } from "@/components/core/WorksList";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Importing AlertDialog components
import { Button } from "@/components/ui/button"; // Importing Button component
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
import { LoaderIcon } from "lucide-react";
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
  const [alertOpen, setAlertOpen] = useState(false); // State to manage AlertDialog visibility

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

  const handleDelete = async () => {
    await Interceptor.handleApi(
      async () => Work.deleteWork(id),
      setLoading,
      (_res) => {
        toast({
          description: "Deleted work successfully",
        });
        window.location.href = "/dashboard"; // Redirect to works list or appropriate page after deletion
      },
      () => {
        toast({
          variant: "destructive",
          description: "Failed to delete work",
        });
      }
    );
  };

  if (!selectedWork) {
    return <h1>Not found</h1>;
  }

  if (loading) {
    return <LoaderIcon className="animate-spin" />;
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
              <div className="flex items-center">
                <Button
                  onClick={() => setAlertOpen(true)}
                  className="mr-4 bg-red-500 text-white"
                >
                  Delete
                </Button>
                <p>
                  <strong>Start Date:</strong> {selectedWork.startDate}
                </p>
                <p className="ml-4">
                  <strong>End Date:</strong> {selectedWork.endDate}
                </p>
              </div>
            </CardDescription>
          </CardContent>
        </div>
      </Card>
      <div className="mt-4">
        <ActivitiesSheet workId={id} />
      </div>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this work?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
