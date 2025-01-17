"use client";

import {
	DropdownMenu,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "../ui/dropdown-menu";
import type { ProfilePrivacy, VisibilityLevel } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updatePrivacy } from "@/actions/profile";

export function EnumDropdown({
	field,
	id,
}: { field: keyof ProfilePrivacy; id: string }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const updateVisibility = async (visibility: VisibilityLevel) => {
		setLoading(true);
		try {
			const { error, message } = await updatePrivacy({ field, id, visibility });
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
			console.error("Error updating visibility:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button disabled={loading}>
					{loading ? <Loader className="animate-spin" /> : "Update"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Visibility Level</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => updateVisibility("PUBLIC")}>
						Visible to everyone
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateVisibility("ALUMNI_ONLY")}>
						Visible to alumni only
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateVisibility("PRIVATE")}>
						Visible to only you
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}