"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { PenLine } from "lucide-react";
import type { Education } from "@prisma/client";
import {
	Card,
	CardHeader,
	CardContent,
	CardDescription,
	CardTitle,
} from "../ui/card";
import { UpdateEducation } from "./update-education";

export function EducationDialog({ education }: { education: Education[] }) {
	const [open, setOpen] = useState(false);
	const [selectedEducation, setSelectedEducation] = useState<
		Education | undefined
	>();
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Update</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Education</DialogTitle>
					<DialogDescription>
						Add your eduction to your profile
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col justify-center">
					{showUpdateForm ? (
						<UpdateEducation education={selectedEducation} />
					) : (
						<div className="grid gap-2">
							{education?.map((edu) => (
								<Card
									key={edu.id}
									className="w-full flex items-center justify-between"
								>
									<CardHeader>
										<CardTitle>
											{edu.degree} at {edu.fieldOfStudy}
										</CardTitle>
										<CardDescription>
											Started {edu.startYear} at {edu.university}
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-6">
										<Button
											size={"icon"}
											onClick={() => {
												setSelectedEducation(edu);
												setShowUpdateForm(true);
											}}
										>
											<PenLine />
										</Button>
									</CardContent>
								</Card>
							))}
							<Button
								onClick={() => {
									setSelectedEducation(undefined);
									setShowUpdateForm(true);
								}}
							>
								Add new
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
