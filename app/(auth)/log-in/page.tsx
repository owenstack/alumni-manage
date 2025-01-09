import { LoginForm } from "@/components/auth/login";
import { ErrorCard } from "@/components/error-card";
import { Logo } from "@/components/logo";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: { searchParams?: Promise<{ error?: string }> }) {
	const error = (await searchParams)?.error;
	if (error) {
		return <ErrorCard error={error} />;
	}

	const authz = await auth.api.getSession({ headers: await headers() });
	if (authz?.user) {
		redirect("/profile");
	}
	return (
		<div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6 z-10">
				<Logo />
				<LoginForm />
			</div>
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				duration={3}
				repeatDelay={1}
				className={cn(
					"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
					"absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
				)}
			/>
		</div>
	);
}
