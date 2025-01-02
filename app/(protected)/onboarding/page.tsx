import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
	const authz = await auth.api.getSession({ headers: await headers() });
	const onboarded = authz?.user.onboarded;
	if (onboarded) {
		redirect("/account");
	}
	return <>Onboarding</>;
}
