'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Auth from "@/handlers/auth";
import { Interceptor } from "@/lib/interceptor";
import { LocalStorage } from "@/lib/localStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";

const loginSchema = z.object({
	email: z.string().min(1, "email cannot be empty"),
	password: z.string().min(1, "password cannot be empty"),
})

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<any | null>();
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log({ values });

		const requestPayload = {
			email: values.email,
			password: values.password
		}

		await Interceptor.handleApi(
			async () => await Auth.login(requestPayload),
			setLoading,
			(res) => {
				setUser && setUser(res);
				LocalStorage.set("user", res?.data ?? null);
				LocalStorage.set("token", res?.data.accessToken ?? null);
				toast({
					description: "Successfully logged in"
				});
				router.push("/")

			},
			() => {
				toast({
					description: "invalid email or password"
				});
				router.push("/login");
			}
		);

		form.reset();
	}

	if (loading) {
		return <LoaderIcon className="animate-spin" />
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<Card className='xl:min-w-[30vw]'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<CardHeader>
							<CardTitle className='text-2xl'>Login</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2'>
							<FormField
								control={form.control}
								name='email'
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
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="enter your password" type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter>
							<Button className='w-full'>Login</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	)
}