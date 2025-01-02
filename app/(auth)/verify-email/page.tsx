import { VerifyEmail } from "@/components/auth/verify";
import { ErrorCard } from "@/components/error-card";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/cn";

export default async function Page({
	searchParams,
}: { searchParams?: Promise<{ error?: string; code?: string }> }) {
	const error = (await searchParams)?.error;
	if (error) {
		return <ErrorCard error={error} />;
	}
	const code = (await searchParams)?.code;
	return (
		<main className="relative flex h-screen w-full items-center justify-center px-4">
			<VerifyEmail code={code} />
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				duration={3}
				repeatDelay={1}
				className={cn(
					"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
					"absolute inset-x-0 top-1/2 -translate-y-1/2 h-[200%]",
				)}
			/>
		</main>
	);
}
