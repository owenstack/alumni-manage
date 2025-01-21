"use client";

import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export function SearchInput({ className }: { className?: string }) {
	const router = useRouter();

	const handleSearch = useDebouncedCallback((value: string) => {
		router.push(`/network?search=${encodeURIComponent(value)}`);
	}, 300);

	return (
		<Input
			type="search"
			placeholder="Search by name or location..."
			autoFocus
			className={cn("w-full", className)}
			onChange={(e) => handleSearch(e.target.value)}
		/>
	);
}
