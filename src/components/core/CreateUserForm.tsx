"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Auth from "@/handlers/auth";
import { UserRole } from "@/lib/const";
import { Interceptor } from "@/lib/interceptor";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export default function CreateUserForm() {
  const [loading, setLoading] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const { toast } = useToast();

  const createUserSchema = z.object({
    firstName: z.string().min(1, "first name cannot be empty"),
    lastName: z.string().min(1, "last name cannot be empty").optional(),
    email: z.string().email("not a valid empty").min(3, "it should be valid"),
    password: z.string().min(3, "cannot be less than 3"),
    address: z.string().min(3, "cannot be less than 3 letters").optional(),
    isdCode: z.string().min(1, "cannot be empty").optional(),
    phoneNumber: z.string().min(1, "cannot be empty").optional(),
    role: z.enum(["supervisor", "contractor"]),
  });

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {},
  });

  const handleCopyPassword = () => {
    const password = form.getValues("password");
    navigator.clipboard
      .writeText(password)
      .then(() => setPasswordCopied(true))
      .catch((err) => console.error("Failed to copy password:", err));

    setTimeout(() => setPasswordCopied(false), 2000); // Reset copied state after 2 seconds
  };

  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    const requestPayload: z.infer<typeof createUserSchema> = {
      ...values,
    };

    await Interceptor.handleApi(
      async () => await Auth.create(requestPayload),
      setLoading,
      (_res) => {
        toast({
          description: "Successfully created user",
        });
      },
      () => {
        toast({
          description: "failed to create user",
        });
      },
      (message) => {
        console.log({ message });
        toast({
          description: message,
        });
      }
    );

    form.reset();
  }

  if (loading) {
    return <LoaderIcon className="animate-spin" />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="xl:min-w-[30vw]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardHeader>
              <CardTitle className="text-2xl">
                Create Subordinate Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        className="ml-2"
                        onClick={handleCopyPassword}
                      >
                        {passwordCopied ? "Copied!" : "Copy Password"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isdCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISD Code</FormLabel>
                    <FormControl>
                      <Input placeholder="enter ISD code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.SUPERVISOR}>
                          Supervisor
                        </SelectItem>
                        <SelectItem value={UserRole.CONTRACTOR}>
                          Contractor
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
