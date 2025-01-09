import { EducationForm } from "@/components/onboarding/education-form";
import { EmploymentForm } from "@/components/onboarding/employment-form";
import { Profile } from "@/components/onboarding/profile";
import { ProfileForm } from "@/components/onboarding/profile-form";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

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
			redirect("/profile");
		}
	}

	// Prevent accessing later or earlier steps
	const allowedStep = Math.ceil(completed / 25);
	if (step > allowedStep || step < allowedStep) {
		redirect(`/onboarding?step=${allowedStep}`);
	}

	return (
		<div className="relative h-screen flex items-center justify-center p-8">
			{step !== 1 && <Profile className="absolute top-10 right-2" />}
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
					<CardContent className="mt-20">
						{step === 1 ? (
							<ProfileForm key={step} />
						) : step === 2 ? (
							<EducationForm key={step} />
						) : step === 3 ? (
							<EmploymentForm key={step} />
						) : (
							<div className="grid gap-4">
								<h2 className="text-center">Onboarding Completed</h2>
								<div className="flex items-center justify-between gap-4">
									<Button>
										<Link href={"/"}>Go home &larr;</Link>
									</Button>
									<Button>
										<Link href={"/profile"}>Dashboard &rarr;</Link>
									</Button>
								</div>
							</div>
						)}
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
