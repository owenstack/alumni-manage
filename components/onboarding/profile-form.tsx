"use client";

import { submitProfile } from "@/actions/onboarding";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth.client";
import type { profileSchema } from "@/lib/constant";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Submit } from "../submit";
import { Badge } from "../ui/badge";
import BlurFade from "../ui/blur-fade";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function ProfileForm() {
	const auth = useSession();
	const { toast } = useToast();
	const [skill, setSkill] = useState("");
	const [skills, setSkills] = useState<string[]>();
	const [interest, setInterest] = useState("");
	const [interests, setInterests] = useState<string[]>();
	const router = useRouter();
	const form = useForm<z.infer<typeof profileSchema>>({
		defaultValues: {
			phone: "",
			linkedinUrl: "",
			location: "",
			bio: "",
			skills: skills,
			interests: interests,
			lastActive: auth?.data?.session?.updatedAt,
		},
	});
	const handleSkillsAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (skill) {
			const updatedSkills = skills ? [...skills, skill] : [skill];
			setSkills(updatedSkills);
			setSkill("");
			form.setValue("skills", updatedSkills);
		}
	};
	const handleInterestAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (interest) {
			const updatedInterests = interests
				? [...interests, interest]
				: [interest];
			setInterests(updatedInterests);
			setInterest("");
			form.setValue("interests", updatedInterests);
		}
	};
	const submit = async (values: z.infer<typeof profileSchema>) => {
		try {
			const { error, message } = await submitProfile(values);
			if (error) {
				toast({
					title: "Something went wrong",
					description: error,
					variant: "destructive",
				});
				form.reset();
				return;
			}
			toast({
				title: "Success",
				description: message,
			});
			router.push("/onboarding?step=2");
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
						name="phone"
						label="Phone number (optional)"
						className="grid gap-2"
						render={({ field }) => (
							<Input type="tel" autoComplete="tel" {...field} required />
						)}
					/>
					<FormField
						name="linkedinUrl"
						label="LinkedIn profile URL (recommended)"
						className="grid gap-2"
						render={({ field }) => (
							<Input
								type="url"
								placeholder="https://www.linkedin.com/in/username"
								{...field}
								required
							/>
						)}
					/>
					<FormField
						name="location"
						label="Your address (optional)"
						className="grid gap-2"
						render={({ field }) => (
							<Input
								autoComplete="address-level1"
								placeholder="Your home address"
								{...field}
							/>
						)}
					/>
					<FormField
						name="bio"
						label="Your bio (recommended)"
						className="grid gap-2"
						render={({ field }) => (
							<Textarea
								placeholder="A little details abut you and your education and work"
								{...field}
							/>
						)}
					/>
					<div className="grid gap-2">
						<Label>Skills you have acquired</Label>
						<div className="flex items-center justify-between gap-2">
							<Input
								value={skill}
								onChange={(e) => setSkill(e.target.value)}
								placeholder="Web development, Data analysis"
							/>
							<Button size={"icon"} onClick={handleSkillsAdd}>
								<Plus />
							</Button>
						</div>
						<div className="flex flex-wrap gap-2">
							{skills?.map((skill) => (
								<Badge
									variant={"outline"}
									key={skill}
									onClick={() => {
										setSkills(skills.filter((item) => item !== skill));
										form.setValue("skills", skills);
									}}
								>
									{skill}
								</Badge>
							))}
						</div>
					</div>
					<div className="grid gap-2">
						<Label>Your interests</Label>
						<div className="flex items-center justify-between gap-2">
							<Input
								value={interest}
								onChange={(e) => setInterest(e.target.value)}
								placeholder="Chess, Photography"
							/>
							<Button size={"icon"} onClick={handleInterestAdd}>
								<Plus />
							</Button>
						</div>
						<div className="flex flex-wrap gap-2">
							{interests?.map((interest) => (
								<Badge
									variant={"outline"}
									key={interest}
									onClick={() => {
										setInterests(interests.filter((item) => item !== interest));
										form.setValue("interests", interests);
									}}
								>
									{interest}
								</Badge>
							))}
						</div>
					</div>
					<Submit>Next step</Submit>
				</form>
			</Form>
		</BlurFade>
	);
}