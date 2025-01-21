import { getUsers } from "@/actions/network";
import { ErrorCard } from "@/components/error-card";
import { NetworkMain } from "@/components/network/main";

export default async function NetworkPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; search?: string }>;
}) {
	const page = Number((await searchParams).page) || 1;
	const search = (await searchParams).search || "";
	const limit = 12;

	const { users, total, error } = await getUsers({
		page,
		limit,
		search,
	});

	if (error) return <ErrorCard error={error} />;

	return (
		<main className="flex flex-col gap-4 md:gap-6 mx-6 md:mx-14 py-4">
			<NetworkMain
				users={users}
				totalPages={Math.ceil((total ?? 0) / limit)}
				page={page}
			/>
		</main>
	);
}
