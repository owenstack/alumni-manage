import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { ProfileForm } from "@/components/onboarding/profile";
import { EducationForm } from "@/components/onboarding/education";
import { EmploymentForm } from "@/components/onboarding/employment";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

export default async function Page({
	searchParams,
}: { searchParams?: Promise<{ step: number }> }) {
	const authz = await auth.api.getSession({ headers: await headers() });
	const completed = authz?.user.completeness ?? 25;
	let step = (await searchParams)?.step;
	if (step && typeof step !== "number") {
		step = Number.parseInt(step);
	}

	if (!step) {
		if (completed <= 25) {
			redirect("/onboarding?step=1");
		} else if (completed <= 50) {
			redirect("/onboarding?step=2");
		} else if (completed <= 75) {
			redirect("/onboarding?step=3");
		} else {
			redirect("/account");
		}
	}

	// Prevent accessing later steps
	const allowedStep = Math.ceil(completed / 25);
	if (step > allowedStep) {
		redirect(`/onboarding?step=${allowedStep}`);
	}

	return (
		<div className="relative h-screen flex items-center justify-center p-8">
			<Card className="relative w-full max-w-md shadow-lg z-10">
				<div className="pt-16">
					<Card className="w-[60%] max-w-md absolute -top-12 left-1/2 -translate-x-1/2">
						<CardHeader className="text-center pb-2">
							<CardTitle className="text-2xl font-semibold">
								Onboarding
							</CardTitle>
							<CardDescription className="font-semibold">
								Complete your profile setup
							</CardDescription>
						</CardHeader>
						<CardContent className="pb-6">
							<div className="flex items-center justify-between px-4">
								{[1, 2, 3].map((num) => (
									<div
										key={num}
										className={cn(
											"rounded-full flex items-center justify-center w-12 h-12",
											step === num
												? "bg-primary text-primary-foreground animate-pulse"
												: completed >= num * 25
													? "bg-primary/80 text-primary-foreground"
													: "bg-secondary text-secondary-foreground",
										)}
									>
										{num}
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					<CardContent className="mt-14">
						{step === 1 && <ProfileForm />}
						{step === 2 && <EducationForm />}
						{step === 3 && <EmploymentForm />}
					</CardContent>
				</div>
			</Card>
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				duration={3}
				repeatDelay={1}
				className={cn(
					"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
					"absolute inset-0 w-full h-full",
				)}
			/>
		</div>
	);
}
