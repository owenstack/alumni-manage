import Background from "@/assets/images/background-image.webp";
import { SignupForm } from "@/components/auth/signup";
import { ErrorCard } from "@/components/error-card";
import { Logo } from "@/components/logo";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
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
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Logo />
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<SignupForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					src={Background.src}
					loading="lazy"
					blurDataURL={Background.blurDataURL}
					alt="placeholder"
					fill
					sizes="100vw"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
