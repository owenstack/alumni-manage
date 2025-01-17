"use client";

import Form from "next/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Submit } from "../submit";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";
import { updateInterests } from "@/actions/profile";
import { useToast } from "@/hooks/use-toast";

export function InterestDialog({ interests }: { interests?: string[] }) {
	const { toast } = useToast();
	const [interest, setInterest] = useState("");
	const [chosen, setChosen] = useState(interests);
	const [open, setOpen] = useState(false);
	const handleInterestAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (interest) {
			const updatedInterests = chosen ? [...chosen, interest] : [interest];
			setChosen(updatedInterests);
			setInterest("");
		}
	};

	const submit = async () => {
		if (chosen) {
			try {
				const { message, error } = await updateInterests(chosen);
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
					<DialogTitle>Interests</DialogTitle>
					<DialogDescription>
						Share your interests to connect with like-minded people
					</DialogDescription>
				</DialogHeader>
				<Form action={submit} className="grid gap-4">
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
							{chosen?.map((interest) => (
								<Badge
									variant={"outline"}
									key={interest}
									onClick={() => {
										setChosen(chosen.filter((item) => item !== interest));
									}}
								>
									{interest}
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
