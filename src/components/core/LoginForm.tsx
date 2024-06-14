'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
})

export default function LoginForm() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log({ values });
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
											<Input {...field} />
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
											<Input type="password" {...field} />
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