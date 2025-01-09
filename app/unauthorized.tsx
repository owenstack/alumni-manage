import { LoginForm } from "@/components/auth/login";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
	const authz = await auth.api.getSession({ headers: await headers() });
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			{authz?.user ? (
				<Card className="w-full max-w-md shadow-lg">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
						<CardDescription>Logged in as {authz.user.email}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-secondary-foreground">
							You are not authorized to access this page. If you believe this is
							a mistake, please contact the administrator for assistance.
						</p>
						<p className="text-sm text-muted-foreground">
							Need help? Contact support at support@example.com
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="w-full max-w-md">
					<LoginForm />
				</div>
			)}
		</div>
	);
}
