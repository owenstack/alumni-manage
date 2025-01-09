"use client";

import { submitEmployment } from "@/actions/onboarding";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/cn";
import type { employmentSchema } from "@/lib/constant";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Submit } from "../submit";
import BlurFade from "../ui/blur-fade";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

export function EmploymentForm() {
	const { toast } = useToast();
	const router = useRouter();
	const [current, setCurrent] = useState(true);
	const form = useForm<z.infer<typeof employmentSchema>>({
		defaultValues: {
			company: "",
			position: "",
			industry: "",
			location: "",
			startDate: new Date(),
			endDate: new Date(),
			isCurrent: current,
			description: "",
		},
	});
	const submit = async (values: z.infer<typeof employmentSchema>) => {
		try {
			const { error, message } = await submitEmployment(values);
			if (error) {
				toast({
					title: "Something went wrong",
					description: error,
					variant: "destructive",
				});
				return;
			}
			toast({ title: "Success", description: message });
			router.push("/profile");
		} catch (error) {
			console.error(error);
			toast({
				title: "Something went wrong",
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};

	return (
		<BlurFade>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submit, (errors) => {
						const errorMessage = Object.values(errors)[0].message;
						console.error(errorMessage);
						toast({
							title: "Invalid response",
							description: errorMessage,
							variant: "destructive",
						});
					})}
					className="grid gap-4"
				>
					<FormField
						name="company"
						label="Company name"
						className="grid gap-2"
						render={({ field }) => <Input placeholder="Acme Inc" {...field} />}
					/>
					<FormField
						name="position"
						label="Employment position"
						className="grid gap-2"
						render={({ field }) => (
							<Input placeholder="Estate surveyor" {...field} />
						)}
					/>
					<FormField
						name="industry"
						label="Current industry"
						className="grid gap-2"
						render={({ field }) => (
							<Input placeholder="Real estate" {...field} />
						)}
					/>
					<FormField
						name="location"
						label="Location (optional)"
						className="grid gap-2"
						render={({ field }) => (
							<Input placeholder="Somewhere in the world" {...field} />
						)}
					/>
					<FormField
						name="description"
						label="Job description (optional)"
						className="grid gap-2"
						render={({ field }) => (
							<Textarea
								placeholder="I survey real estate as the job title suggests"
								{...field}
							/>
						)}
					/>
					<div className="flex items-center justify-between gap-2">
						<FormField
							name="startDate"
							label="Start Date"
							className="grid gap-2"
							render={({ field }) => (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"w-full pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
											className="rounded-md border shadow-md"
										/>
									</PopoverContent>
								</Popover>
							)}
						/>
						<FormField
							name="isCurrent"
							label="Current job?"
							className="grid gap-2"
							render={({ field }) => (
								<div className="flex items-center gap-2">
									<span>No</span>
									<Switch
										checked={field.value}
										onCheckedChange={(value) => {
											field.onChange(value);
											setCurrent(value);
										}}
									/>
									<span>Yes</span>
								</div>
							)}
						/>
					</div>
					{!current && (
						<FormField
							name="endDate"
							label="End Date"
							className="grid gap-2"
							render={({ field }) => (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"w-full md:w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
											className="rounded-md border shadow-md"
										/>
									</PopoverContent>
								</Popover>
							)}
						/>
					)}
					<Submit>Submit</Submit>
				</form>
			</Form>
		</BlurFade>
	);
}
