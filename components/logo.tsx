import { cn } from "@/lib/cn";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function Logo({ className }: { className?: string }) {
	return (
		<Link
			href="/"
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"flex items-center gap-2 self-center font-medium",
				className,
			)}
		>
			<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<GalleryVerticalEnd className="size-4" />
			</div>
			Acme Inc.
		</Link>
	);
}