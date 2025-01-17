"use client";

import { updateEducation } from "@/actions/profile";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth.client";
import type { Education } from "@prisma/client";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Submit } from "../submit";
import BlurFade from "../ui/blur-fade";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export function UpdateEducation({ education }: { education?: Education }) {
	const { data } = useSession();
	const { toast } = useToast();
	const router = useRouter();
	const [achievement, setAchievement] = useState("");
	const [achievements, setAchievements] = useState<string[]>();
	const form = useForm<Education>({
		defaultValues: education ?? {
			id: nanoid(15),
			userId: data?.user.id,
			university: "",
			degree: "",
			fieldOfStudy: "",
			startYear: new Date().getFullYear() - 4,
			endYear: new Date().getFullYear(),
			achievements: [],
			visibility: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	const handleAchievementsAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (achievement) {
			const updatedAchievements = achievements
				? [...achievements, achievement]
				: [achievement];
			setAchievements(updatedAchievements);
			setAchievement("");
			form.setValue("achievements", updatedAchievements);
		}
	};
	const submit = async (values: Education) => {
		try {
			const { error, message } = await updateEducation(values);
			if (error) {
				toast({
					title: "Something went wrong",
					description: error,
					variant: "destructive",
				});
				return;
			}
			toast({
				title: "Success",
				description: message,
			});
			router.refresh();
		} catch (error) {
			console.error(error);
			toast({
				title: "Something went wrong",
				description:
					error instanceof Error ? error.message : "Internal server error",
				variant: "destructive",
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
						name="degree"
						className="grid gap-2"
						label="Your degree"
						render={({ field }) => {
							const degreeOptions = [
								"Bachelor of Science (B.Sc)",
								"Bachelor of Arts (B.A)",
								"Master of Science (M.Sc)",
								"Master of Business Administration (MBA)",
								"Doctor of Philosophy (Ph.D.)",
								"Other",
							];
							const [custom, setCustom] = useState(false);
							const [customDegree, setCustomDegree] = useState("");

							const handleDegreeChange = (value: string) => {
								if (value === "Other") {
									setCustom(true);
									field.onChange(""); // Clear the main field to rely on custom input
								} else {
									setCustom(false);
									field.onChange(value);
								}
							};
							const handleCustomDegreeChange = (
								e: React.ChangeEvent<HTMLInputElement>,
							) => {
								setCustomDegree(e.target.value);
								field.onChange(e.target.value); // Sync with parent form
							};
							return (
								<>
									<Select
										value={custom ? "Other" : field.value}
										onValueChange={handleDegreeChange}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select your degree" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{degreeOptions.map((degree) => (
													<SelectItem key={degree} value={degree}>
														{degree}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									{custom && (
										<Input
											placeholder="Enter your degree"
											value={customDegree}
											onChange={handleCustomDegreeChange}
										/>
									)}
								</>
							);
						}}
					/>
					<FormField
						name="fieldOfStudy"
						label="Field of Study"
						className="grid gap-2"
						render={({ field }) => (
							<Input placeholder="Statistics" {...field} />
						)}
					/>
					<FormField
						name="university"
						label="University you attained the degree"
						className="grid gap-2"
						render={({ field }) => (
							<Input {...field} placeholder="University of Nigeria, Nsukka" />
						)}
					/>
					<div className="flex items-center justify-between gap-4 ">
						<FormField
							name="startYear"
							label="Start Year"
							className="w-full"
							render={({ field }) => (
								<Input
									type="number"
									min={1900}
									max={new Date().getFullYear()}
									{...field}
									onChange={(e) => {
										const value = Number.parseInt(e.target.value);
										if (value > form.getValues("endYear")) {
											toast({
												title: "Invalid year",
												description: "Start year cannot be after end year",
												variant: "destructive",
											});
											return;
										}
										field.onChange(value);
									}}
								/>
							)}
						/>
						<FormField
							name="endYear"
							label="End Year"
							className="w-full"
							render={({ field }) => (
								<Input
									type="number"
									min={form.getValues("startYear")}
									max={new Date().getFullYear()}
									{...field}
									onChange={(e) => {
										const value = Number.parseInt(e.target.value);
										if (value < form.getValues("startYear")) {
											toast({
												title: "Invalid year",
												description: "End year cannot be before start year",
												variant: "destructive",
											});
											return;
										}
										field.onChange(value);
									}}
								/>
							)}
						/>
					</div>
					<div className="grid gap-2">
						<Label>Your achievements</Label>
						<div className="flex items-center justify-between gap-2">
							<Input
								value={achievement}
								onChange={(e) => setAchievement(e.target.value)}
							/>
							<Button size={"icon"} onClick={handleAchievementsAdd}>
								<Plus />
							</Button>
						</div>
						<ul className="flex flex-col gap-2">
							{achievements?.map((a) => (
								<Button
									className="self-start whitespace-break-spaces"
									variant={"link"}
									key={a}
									onClick={() => {
										setAchievements(achievements.filter((item) => item !== a));
										form.setValue("achievements", achievements);
									}}
								>
									{a}
								</Button>
							))}
						</ul>
					</div>
					<Submit>Submit</Submit>
				</form>
			</Form>
		</BlurFade>
	);
}
