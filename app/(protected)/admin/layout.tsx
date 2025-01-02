import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

export default async function AdminLayout({
	children,
}: { children: React.ReactNode }) {
	const authz = await auth.api.getSession({ headers: await headers() });
	if (authz?.user.role === "user") {
		return unauthorized();
	}
	return <>{children}</>;
}
