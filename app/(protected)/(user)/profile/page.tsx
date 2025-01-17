import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ProfileMain from "@/components/profile/main";

export default async function Page() {
	const authz = await auth.api.getSession({ headers: await headers() });
	const onboarded = authz?.user.completeness as number;
	const [profile, education, employment] = await Promise.all([
		prisma.profile.findUnique({ where: { userId: authz?.user.id } }),
		prisma.education.findMany({ where: { userId: authz?.user.id } }),
		prisma.employment.findMany({ where: { userId: authz?.user.id } }),
	]);

	const privacy = await prisma.profilePrivacy.findUnique({
		where: { profileId: profile?.id },
	});
	if (!profile || !education || !employment || !privacy || onboarded <= 25) {
		redirect("/onboarding");
	}
	return (
		<main className="flex flex-col gap-4 md:gap-6 mx-6 md:mx-14 py-4">
			<ProfileMain
				profile={profile}
				education={education}
				employment={employment}
				privacy={privacy}
			/>
		</main>
	);
}
