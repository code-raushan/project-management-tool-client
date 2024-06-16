"use client";

import Work from "@/handlers/work";
import { Interceptor } from "@/lib/interceptor";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../ui/use-toast";
import NoWorkCreated from "./NoWorkCard";

export interface IWorks {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  activities: {
    activityRef: string;
    activityDescription: string;
    assignedDates: string[];
  }[];
}

export default function WorksList() {
  const [list, setList] = useState<IWorks[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await Interceptor.handleApi(
        async () => Work.listWorks(),
        setLoading,
        (res) => {
          setList(() => (Array.isArray(res.data) ? res.data : []));
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

  if (loading)
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );

  return (
    <main>
      <ScrollArea className="w-full h-[500px] p-4 overflow-y-auto">
        {list.length ? (
          list.map((item) => (
            <Card
              key={item._id}
              className="mb-4 shadow-md cursor-pointer"
              onClick={() => router.push(`/work/${item._id}`)}
            >
              <div className="flex justify-between items-center p-4">
                <CardHeader className="flex-shrink-0">
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="pt-5">
                    <p>
                      <strong>
                        Activities:{" "}
                        {item.activities ? item.activities.length : 0}
                      </strong>
                    </p>
                    <p>
                      <strong>Start Date:</strong> {item.startDate}
                    </p>
                    <p>
                      <strong>End Date:</strong> {item.endDate}
                    </p>
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <NoWorkCreated />
        )}
      </ScrollArea>
    </main>
  );
}
