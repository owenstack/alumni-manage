"use client";

import type { UserPreview } from "@/lib/constant";
import { useSearchParams } from "next/navigation";
import { Pagination } from "./pagination";
import { SearchInput } from "./search";
import { UsersCard } from "./users-card";

export function NetworkMain({
	users,
	totalPages,
	page,
}: { users?: UserPreview[]; totalPages: number; page: number }) {
	const searchParams = useSearchParams();
	const query = searchParams.get("search");
	return (
		<>
			<SearchInput className="md:max-w-md md:absolute md:right-4 backdrop-blur-sm bg-inherit" />
			{query && (
				<p className="text-xl">
					Search results for{" "}
					<span className="font-semibold text-primary">"{query}"</span>
				</p>
			)}
			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{users?.map((user) => (
					<UsersCard key={user.id} user={user} />
				))}
			</section>
			<Pagination totalPages={totalPages} page={page} />
		</>
	);
}
