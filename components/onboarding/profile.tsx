"use client";

import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth.client";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import { Progress } from "../ui/progress";

export function Profile({ url = "/profile", className = "" }) {
	const { data, isPending, error } = useSession();
	const { toast } = useToast();

	if (error) {
		toast({
			title: "Something went wrong",
			description: error.message,
			variant: "destructive",
		});
	}

	if (isPending) {
		return (
			<div
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"animate-pulse",
					className,
				)}
			>
				<div className="h-10 w-10 rounded-full bg-muted" />
			</div>
		);
	}

	if (!data) {
		return (
			<Link
				href="/login"
				className={cn(buttonVariants({ variant: "ghost" }), className)}
			>
				Sign in
			</Link>
		);
	}

	return (
		<Link
			href={url}
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"relative group w-fit",
				className,
			)}
		>
			<div className="flex items-center justify-between gap-2 p-4 w-fit transition-all duration-300">
				<Avatar>
					<AvatarImage src={data.user.image ?? ""} alt={data.user.name} />
					<AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1 relative truncate">
					<span className="opacity-100 group-hover:opacity-0 transition-opacity duration-200">
						Profile
					</span>
					<span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
						{data.user.name}
					</span>
				</div>
			</div>
			<Progress
				className="absolute -bottom-2 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
				value={data.user.completeness}
				max={100}
			/>
		</Link>
	);
}
