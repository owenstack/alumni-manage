"use client";

import { updateSkills } from "@/actions/profile";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { Submit } from "../submit";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function SkillDialog({ skills }: { skills?: string[] }) {
	const { toast } = useToast();
	const [skill, setSkill] = useState("");
	const [chosen, setChosen] = useState(skills);
	const [open, setOpen] = useState(false);
	const handleSkillAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (skill) {
			const updatedSkills = chosen ? [...chosen, skill] : [skill];
			setChosen(updatedSkills);
			setSkill("");
		}
	};
	const submit = async () => {
		if (chosen) {
			try {
				const { message, error } = await updateSkills(chosen);
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
			} catch (error) {
				console.error(error);
				toast({
					title: "Something went wrong",
					description:
						error instanceof Error ? error.message : "Internal server error",
					variant: "destructive",
				});
			} finally {
				setOpen(false);
			}
		}
		toast({
			title: "Invalid body",
			variant: "destructive",
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Update</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Skills</DialogTitle>
					<DialogDescription>
						Let others know what you're good at
					</DialogDescription>
				</DialogHeader>
				<Form action={submit} className="grid gap-4">
					<div className="grid gap-2">
						<Label>Your interests</Label>
						<div className="flex items-center justify-between gap-2">
							<Input
								value={skill}
								onChange={(e) => setSkill(e.target.value)}
								placeholder="Web development, data analysis"
							/>
							<Button size={"icon"} onClick={handleSkillAdd}>
								<Plus />
							</Button>
						</div>
						<div className="flex flex-wrap gap-2">
							{chosen?.map((skill) => (
								<Badge
									variant={"outline"}
									key={skill}
									onClick={() => {
										setChosen(chosen.filter((item) => item !== skill));
									}}
								>
									{skill}
								</Badge>
							))}
						</div>
					</div>
					<Submit>Submit</Submit>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
