// "use client";

// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Work from "@/handlers/work";
// import { Interceptor } from "@/lib/interceptor";
// import { LoaderIcon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useToast } from "../ui/use-toast";

// interface IWorkData {
//   workId: string;
//   title: string;
//   date: string;
//   startDate: string;
//   endDate: string;
//   activities: {
//     activityId: string;
//     activityRef: string;
//     activityDescription: string;
//     status?: string;
//     comment?: string;
//   }[];
// }
// interface ActivityStatus {
//   date?: string;
//   status?: string;
//   comment?: string;
// }

// interface Activity {
//   activityId: string;
//   activityRef: string;
//   activityDescription: string;
//   activityStatus: ActivityStatus[];
// }

// interface IWork {
//   workId: string;
//   title: string;
//   date: string;
//   startDate: string;
//   endDate: string;
//   activities: Activity[];
// }

// const SupervisionSheet: React.FC = () => {
//   const [data, setData] = useState<IWorkData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   const transformData = (apiData: IWork[]): IWorkData[] => {
//     return apiData.map((work) => ({
//       ...work,
//       activities: work.activities.map((activity) => {
//         const matchingStatus = activity.activityStatus.find(
//           (status) => status.date === work.date
//         );
//         return {
//           activityId: activity.activityId,
//           activityRef: activity.activityRef,
//           activityDescription: activity.activityDescription,
//           status: matchingStatus?.status,
//           comment: matchingStatus?.comment,
//         };
//       }),
//     }));
//   };

//   useEffect(() => {
//     const getData = async (date: string) => {
//       Interceptor.handleApi(
//         async () => Work.getActivitiesByDate(date),
//         setLoading,
//         (res) => {
//           const details = res.data;
//           console.log("Fetched data:", details);
//           if (details && details.length > 0) {
//             const transformedData = transformData(details);
//             setData(transformedData);
//             console.log("Updated state data:", transformedData);
//             toast({
//               description: "Successfully fetched dated work details",
//             });
//           } else {
//             setData([]);
//             toast({
//               description: "No data available for the selected date",
//             });
//           }
//         },
//         () => {
//           setData([]);
//           toast({
//             description: "Failed to load the details of this date work",
//           });
//         }
//       );
//     };

//     getData("19-06-2024");
//   }, [toast]);

//   const handleStatusChange = (
//     workId: string,
//     activityId: string,
//     status: string
//   ) => {
//     setData((prevData) =>
//       prevData.map((work) =>
//         work.workId === workId
//           ? {
//               ...work,
//               activities: work.activities.map((activity) =>
//                 activity.activityId === activityId
//                   ? { ...activity, status }
//                   : activity
//               ),
//             }
//           : work
//       )
//     );
//   };

//   const handleCommentChange = (
//     workId: string,
//     activityId: string,
//     comment: string
//   ) => {
//     setData((prevData) =>
//       prevData.map((work) =>
//         work.workId === workId
//           ? {
//               ...work,
//               activities: work.activities.map((activity) =>
//                 activity.activityId === activityId
//                   ? { ...activity, comment }
//                   : activity
//               ),
//             }
//           : work
//       )
//     );
//   };

//   if (loading) {
//     return <LoaderIcon className="animate-spin" />;
//   }

//   return (
//     <div>
//       <h1>Work Activities</h1>
//       <div className="table-container">
//         {data.length === 0 ? (
//           <p>No work activities available for the selected date.</p>
//         ) : (
//           data.map((work) => (
//             <div key={work.workId} className="work-section">
//               <h3>{work.title}</h3>
//               <Table>
//                 <TableCaption>Activities Table for {work.date}</TableCaption>
//                 <TableHeader>
//                   <TableRow>
//                     <TableCell>Activity Ref</TableCell>
//                     <TableCell>Activity Description</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Comment</TableCell>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {work.activities.map((activity) => (
//                     <TableRow key={activity.activityId}>
//                       <TableCell>{activity.activityRef}</TableCell>
//                       <TableCell>{activity.activityDescription}</TableCell>
//                       <TableCell>
//                         <Select
//                           value={activity.status || ""}
//                           onValueChange={(value) =>
//                             handleStatusChange(
//                               work.workId,
//                               activity.activityId,
//                               value
//                             )
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select..." />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="FINISHED">FINISHED</SelectItem>
//                             <SelectItem value="PENDING">PENDING</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={activity.comment || ""}
//                           onChange={(e) =>
//                             handleCommentChange(
//                               work.workId,
//                               activity.activityId,
//                               e.target.value
//                             )
//                           }
//                           placeholder="Add comment"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupervisionSheet;

"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Work from "@/handlers/work";
import { Interceptor } from "@/lib/interceptor";
import { LoaderIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

interface IWorkData {
  workId: string;
  title: string;
  date: string;
  startDate: string;
  endDate: string;
  activities: {
    activityId: string;
    activityRef: string;
    activityDescription: string;
    status?: string;
    comment?: string;
  }[];
}

interface ActivityStatus {
  date?: string;
  status?: string;
  comment?: string;
}

export interface Activity {
  activityId: string;
  activityRef: string;
  activityDescription: string;
  activityStatus: ActivityStatus[];
}

interface IWork {
  workId: string;
  title: string;
  date: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
}

const SupervisionSheet: React.FC = () => {
  const [data, setData] = useState<IWork[]>([]);
  const [transformedData, setTransformedData] = useState<IWorkData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const transformData = (apiData: IWork[]): IWorkData[] => {
    return apiData.map((work) => ({
      ...work,
      activities: work.activities.map((activity) => {
        const matchingStatus = activity.activityStatus.find(
          (status) => status.date === work.date
        );
        return {
          activityId: activity.activityId,
          activityRef: activity.activityRef,
          activityDescription: activity.activityDescription,
          status: matchingStatus?.status,
          comment: matchingStatus?.comment,
        };
      }),
    }));
  };

  useEffect(() => {
    const getData = async (date: string) => {
      Interceptor.handleApi(
        async () => Work.getActivitiesByDate(date),
        setLoading,
        (res) => {
          const details = res.data;
          console.log("Fetched data:", details);
          if (details && details.length > 0) {
            setData(details);
            const transformedData = transformData(details);
            setTransformedData(transformedData);
            console.log("Updated state data:", transformedData);
            toast({
              description: "Successfully fetched dated work details",
            });
          } else {
            setData([]);
            setTransformedData([]);
            toast({
              description: "No data available for the selected date",
            });
          }
        },
        () => {
          setData([]);
          setTransformedData([]);
          toast({
            description: "Failed to load the details of this date work",
          });
        }
      );
    };

    getData("19-06-2024");
  }, [toast]);

  // useEffect(() => {
  //   console.log("Data updated:", data);
  // }, [data]);

  // useEffect(() => {
  //   console.log("TransformedData updated:", transformedData);
  // }, [transformedData]);

  // const handleStatusChange = (
  //   workId: string,
  //   activityId: string,
  //   newStatus: string
  // ) => {
  //   const tempData = data;

  //   console.log({ workId, activityId, newStatus });

  //   setData((prevData) =>
  //     prevData.map((work) =>
  //       work.workId === workId
  //         ? {
  //             ...work,
  //             activities: work.activities.map((activity) =>
  //               activity.activityId === activityId
  //                 ? {
  //                     ...activity,
  //                     activityStatus: [
  //                       ...activity.activityStatus.filter(
  //                         (status) => status.date !== work.date
  //                       ),
  //                       {
  //                         date: work.date,
  //                         status: newStatus,
  //                         comment: activity.activityStatus.find(
  //                           (status) => status.date === work.date
  //                         )?.comment,
  //                       },
  //                     ],
  //                   }
  //                 : activity
  //             ),
  //           }
  //         : work
  //     )
  //   );

  //   const tempTransformedData = transformedData;

  //   // Update transformedData as well
  //   setTransformedData((prevData) =>
  //     prevData.map((work) =>
  //       work.workId === workId
  //         ? {
  //             ...work,
  //             activities: work.activities.map((activity) =>
  //               activity.activityId === activityId
  //                 ? { ...activity, status: newStatus }
  //                 : activity
  //             ),
  //           }
  //         : work
  //     )
  //   );

  //   // const getNewActivities = data.find(
  //   //   (work) => work.workId === workId
  //   // )?.activities;

  //   // if (!getNewActivities) {
  //   //   toast({
  //   //     description: "failed to update the activities",
  //   //   });

  //   //   setData(tempData);
  //   //   setTransformedData(tempTransformedData);
  //   //   return;
  //   // }

  //   // console.log({ getNewActivities });

  //   console.log({ updatedData: data });

  //   const getNewActivities = data.find(
  //     (work) => work.workId === workId
  //   )?.activities;
  //   console.log({ getNewActivities });

  //   Interceptor.handleApi(
  //     async () =>
  //       await Work.updateWorkActivities({
  //         id: workId,
  //         activities: getNewActivities || [],
  //       }),

  //     (res) => {
  //       toast({
  //         description: "updated the activites",
  //       });
  //     },
  //     () => {
  //       toast({
  //         description: "failed to update the activities",
  //       });

  //       // setData(tempData);
  //       // setTransformedData(tempTransformedData);
  //     }
  //   );
  // };

  const handleStatusChange = (
    workId: string,
    activityId: string,
    newStatus: string
  ) => {
    setData((prevData) =>
      prevData.map((work) =>
        work.workId === workId
          ? {
              ...work,
              activities: work.activities.map((activity) =>
                activity.activityId === activityId
                  ? {
                      ...activity,
                      activityStatus: [
                        ...activity.activityStatus.filter(
                          (status) => status.date !== work.date
                        ),
                        {
                          date: work.date,
                          status: newStatus,
                          comment:
                            activity.activityStatus.find(
                              (status) => status.date === work.date
                            )?.comment || "",
                        },
                      ],
                    }
                  : activity
              ),
            }
          : work
      )
    );

    console.log({ updatedData: data });

    setTransformedData((prevData) =>
      prevData.map((work) =>
        work.workId === workId
          ? {
              ...work,
              activities: work.activities.map((activity) =>
                activity.activityId === activityId
                  ? { ...activity, status: newStatus }
                  : activity
              ),
            }
          : work
      )
    );

    const getNewActivities = data.find(
      (work) => work.workId === workId
    )?.activities;

    console.log({ getNewActivities });

    Interceptor.handleApi(
      async () =>
        await Work.updateWorkActivities({
          id: workId,
          activities: getNewActivities || [],
        }),
      (res) => {
        toast({
          description: "updated the activities",
        });
      },
      () => {
        toast({
          description: "failed to update the activities",
        });
      }
    );
  };

  const handleCommentChange = (
    workId: string,
    activityId: string,
    newComment: string
  ) => {
    const tempData = data;
    setData((prevData) =>
      prevData.map((work) =>
        work.workId === workId
          ? {
              ...work,
              activities: work.activities.map((activity) =>
                activity.activityId === activityId
                  ? {
                      ...activity,
                      activityStatus: [
                        ...activity.activityStatus.filter(
                          (status) => status.date !== work.date
                        ),
                        {
                          date: work.date,
                          status: activity.activityStatus.find(
                            (status) => status.date === work.date
                          )?.status,
                          comment: newComment,
                        },
                      ],
                    }
                  : activity
              ),
            }
          : work
      )
    );

    const tempTransformedData = transformedData;

    setTransformedData((prevData) =>
      prevData.map((work) =>
        work.workId === workId
          ? {
              ...work,
              activities: work.activities.map((activity) =>
                activity.activityId === activityId
                  ? { ...activity, comment: newComment }
                  : activity
              ),
            }
          : work
      )
    );

    // const getNewActivities = data.find(
    //   (work) => work.workId === workId
    // )?.activities;

    // if (!getNewActivities) {
    //   toast({
    //     description: "failed to update the activities",
    //   });

    //   setData(tempData);
    //   setTransformedData(tempTransformedData);
    //   return;
    // }

    const getNewActivities = data.filter((work) => work.workId === workId)[0]
      .activities;

    console.log({ getNewActivities });

    Interceptor.handleApi(
      async () =>
        await Work.updateWorkActivities({
          id: workId,
          activities: getNewActivities,
        }),

      (res) => {
        toast({
          description: "updated the activites",
        });
      },
      () => {
        toast({
          description: "failed to update the activities",
        });

        setData(tempData);
        setTransformedData(tempTransformedData);
      }
    );
  };

  if (data) {
    console.log({ data });
  }

  if (loading) {
    return <LoaderIcon className="animate-spin" />;
  }

  return (
    <div>
      <h1>Work Activities</h1>
      <div className="table-container">
        {transformedData.length === 0 ? (
          <p>No work activities available for the selected date.</p>
        ) : (
          transformedData.map((work) => (
            <div key={work.workId} className="work-section">
              <h3>{work.title}</h3>
              <Table>
                <TableCaption>Activities Table for {work.date}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell>Activity Ref</TableCell>
                    <TableCell>Activity Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Comment</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {work.activities.map((activity) => (
                    <TableRow key={activity.activityId}>
                      <TableCell>{activity.activityRef}</TableCell>
                      <TableCell>{activity.activityDescription}</TableCell>
                      <TableCell>
                        <Select
                          value={activity.status || ""}
                          onValueChange={(value) => {
                            console.log(
                              "Select onvaluechanged called with: ",
                              value
                            );
                            handleStatusChange(
                              work.workId,
                              activity.activityId,
                              value
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FINISHED">FINISHED</SelectItem>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={activity.comment || ""}
                          onChange={(e) =>
                            handleCommentChange(
                              work.workId,
                              activity.activityId,
                              e.target.value
                            )
                          }
                          placeholder="Add comment"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SupervisionSheet;
