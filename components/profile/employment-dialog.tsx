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
import type { Employment } from "@prisma/client";
import {
	Card,
	CardHeader,
	CardContent,
	CardDescription,
	CardTitle,
} from "../ui/card";
import { UpdateEmployment } from "./update-employment";

export function EmploymentDialog({ employment }: { employment: Employment[] }) {
	const [open, setOpen] = useState(false);
	const [selectedEmployment, setSelectedEmployment] = useState<
		Employment | undefined
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
						<UpdateEmployment employment={selectedEmployment} />
					) : (
						<div className="grid gap-2">
							{employment?.map((emp) => (
								<Card
									key={emp.id}
									className="w-full flex items-center justify-between"
								>
									<CardHeader>
										<CardTitle>
											{emp.position} at {emp.company}
										</CardTitle>
										<CardDescription>
											Started{" "}
											{new Date(emp.startDate).toLocaleString("en-US", {
												month: "short",
												year: "numeric",
											})}{" "}
											at {emp.company}
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-6">
										<Button
											size={"icon"}
											onClick={() => {
												setSelectedEmployment(emp);
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
									setSelectedEmployment(undefined);
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
