"use client";
import { Input } from "@/components/ui/input"; // Import Input component from Shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import custom Select component
import Work from "@/handlers/work";
import { getDatesBetween, getWeekDay } from "@/lib/date";
import { Interceptor } from "@/lib/interceptor";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useToast } from "../ui/use-toast";
import { IWorks } from "./WorksList";

interface Activity {
  activityRef: string;
  activityDescription: string;
  dates: { [key: string]: string }; // Stores selected options for each date
}

const options = [
  { value: "Scheduled", label: "Scheduled" },
  { value: "Not Scheduled", label: "Not Scheduled" },
];

export default function ActivitiesSheet({ workId }: { workId: string }) {
  const [selectedWork, setSelectedWork] = useState<IWorks | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadActivitiesLoading, setUploadActivitiesLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async (id: string) => {
      await Interceptor.handleApi(
        async () => Work.getWorkDetails(id),
        setLoading,
        (res) => {
          const workDetails = res.data;
          setSelectedWork(workDetails);

          // Map the retrieved activities to the Activity interface
          const mappedActivities = workDetails.activities.map(
            (activity: any) => {
              const dates: { [key: string]: string } = {};
              activity.assignedDates.forEach((date: string) => {
                dates[`${date} (${getWeekDay(date)})`] = "Scheduled";
              });
              return {
                activityRef: activity.activityRef,
                activityDescription: activity.activityDescription,
                dates,
              };
            }
          );
          setActivities(mappedActivities);
        },
        () => {
          toast({
            description: "Failed to load the works",
          });
        }
      );
    };
    fetchData(workId);
  }, [workId, toast]);

  const workDates = selectedWork
    ? getDatesBetween(selectedWork.startDate, selectedWork.endDate)
    : [];

  const weeks = workDates.reduce((acc, date, index) => {
    const weekIndex = Math.floor(index / 7);
    if (!acc[weekIndex]) {
      acc[weekIndex] = [];
    }
    acc[weekIndex].push(date);
    return acc;
  }, [] as string[][]);

  const weekLabels = weeks.map((_, index) => `Week ${index + 1}`);

  const handleAddRow = () => {
    setActivities([
      ...activities,
      { activityRef: "", activityDescription: "", dates: {} },
    ]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newActivities = [...activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setActivities(newActivities);
  };

  const handleSelectChange = (index: number, date: string, value: string) => {
    const newActivities = [...activities];
    newActivities[index].dates[date] = value;
    setActivities(newActivities);
  };

  const handleSubmit = async () => {
    const matrixData = activities.map((activity) => [
      activity.activityRef,
      activity.activityDescription,
      ...workDates.map((date) => activity.dates[date] || ""),
    ]);

    const activitiesInformation = activities.map((activity) => {
      const scheduledDatesForActivity = workDates.filter(
        (date) => activity.dates[date] === "Scheduled"
      );
      return {
        activityRef: activity.activityRef,
        activityDescription: activity.activityDescription,
        assignedDates: scheduledDatesForActivity.map(
          (date) => date.split(" ")[0]
        ),
      };
    });

    const newActivitiesInformation = activitiesInformation.filter(
      (activity) =>
        activity.activityDescription.trim() !== "" &&
        activity.activityRef.trim() !== ""
    );

    await Interceptor.handleApi(
      async () =>
        await Work.addActivites({
          workId,
          activities: newActivitiesInformation,
        }),
      setUploadActivitiesLoading,
      (_res) => {
        toast({
          description: "Uploaded activities successfully",
        });
      },
      () => {
        toast({
          variant: "destructive",
          description: "Failed to upload activities",
        });
      }
    );

    window.location.reload();
  };

  return (
    <div>
      <Table>
        <TableCaption>Activities Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={6} className="border border-white">
              <div className="flex justify-center">Activity Details</div>
            </TableCell>
            {weekLabels.map((label, index) => (
              <TableCell
                key={index}
                colSpan={weeks[index].length}
                className="border border-white"
              >
                <div className="flex justify-center">{label}</div>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="border border-white">
              Activity REF
            </TableCell>
            <TableCell colSpan={4} className="border border-white">
              Activity Description
            </TableCell>
            {workDates.map((date, index) => (
              <TableCell key={index} className="border border-white">
                {date}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, index) => (
            <TableRow key={index}>
              <TableCell colSpan={2} className="border border-white">
                <Input
                  value={activity.activityRef}
                  onChange={(e: { target: { value: string } }) =>
                    handleInputChange(index, "activityRef", e.target.value)
                  }
                />
              </TableCell>
              <TableCell colSpan={4} className="border border-white">
                <Input
                  value={activity.activityDescription}
                  onChange={(e: { target: { value: string } }) =>
                    handleInputChange(
                      index,
                      "activityDescription",
                      e.target.value
                    )
                  }
                />
              </TableCell>
              {workDates.map((date) => (
                <TableCell key={date} className="border border-white">
                  <Select
                    value={activity.dates[date] || "Not Scheduled"}
                    onValueChange={(value) =>
                      handleSelectChange(index, date, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="border border-white">
              Total Activities
            </TableCell>
            <TableCell colSpan={4} className="text-right border border-white">
              {activities.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <button
        onClick={handleAddRow}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Row
      </button>
      <button
        onClick={handleSubmit}
        className="mt-4 ml-4 p-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}
