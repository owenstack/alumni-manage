import type { ProfilePrivacy, VisibilityLevel } from "@prisma/client";
import prisma from "./db";

export async function canViewField(
	field: keyof ProfilePrivacy,
	viewerId: string | null,
	profileId: string,
): Promise<boolean> {
	const privacy = await prisma.profilePrivacy.findUnique({
		where: { profileId },
	});

	if (!privacy) return false;

	const visibility = privacy[field];

	switch (visibility) {
		case "PUBLIC":
			return true;
		case "ALUMNI_ONLY": {
			if (!viewerId) return false;
			const viewer = await prisma.user.findUnique({ where: { id: viewerId } });
			return !!viewer?.emailVerified;
		}
		case "PRIVATE":
			return viewerId === profileId;
		default:
			return false;
	}
}
