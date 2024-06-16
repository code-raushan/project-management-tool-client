"use client";

import Work from "@/handlers/work";
import { Interceptor } from "@/lib/interceptor";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns"; // Corrected the import from `formatDate` to `format`
import { CalendarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export default function Works() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const workSchema = z.object({
    title: z.string().min(1, "work title cannot be empty"),
    startDate: z.date(),
    endDate: z.date(),
  });

  async function onSubmit(values: z.infer<typeof workSchema>) {
    const requestPayload = {
      title: values.title,
      startDate: format(values.startDate, "yyyy-MM-dd"),
      endDate: format(values.endDate, "yyyy-MM-dd"),
    };

    await Interceptor.handleApi(
      async () => await Work.create(requestPayload),
      setLoading,
      (res) => {
        toast({
          description: "created work details",
        });
      },
      () => {
        toast({
          variant: "destructive",
          description: "Failed to create work details",
        });
      }
    );

    form.reset();
    window.location.reload();
  }

  const form = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
  });

  return (
    <div className="flex flex-col items-center">
      <Card className="xl:min-w-[30vw]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardHeader>
              <CardTitle className="text-2xl">Works Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter work title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className={`w-auto p-0  ${
                            theme === "dark" ? "bg-black" : "bg-white"
                          } shadow-md rounded-md z-50`}
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Start date of the works.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className={`w-auto p-0  ${
                            theme === "dark" ? "bg-black" : "bg-white"
                          } shadow-md rounded-md z-50`}
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(Date.now()) ||
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>End date of the works.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
