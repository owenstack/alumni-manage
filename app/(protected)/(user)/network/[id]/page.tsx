import { getUser } from "@/actions/network";
import { UserDetailPage } from "@/components/network/details";
import { ErrorCard } from "@/components/error-card";

export default async function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const { error, user } = await getUser(id);
	if (error) return <ErrorCard error={error} />;
	return (
		<main className="flex flex-col gap-4 md:gap-6 mx-6 md:mx-14 py-4">
			<h2>Specific user page with id {id}</h2>
			<UserDetailPage user={user} />
		</main>
	);
}
