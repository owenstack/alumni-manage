import type { User } from "@prisma/client";
import {
	House,
	type LucideIcon,
	Settings,
	UserRound,
	UsersRound,
} from "lucide-react";
import { z } from "zod";

export const profileSchema = z.object({
	phone: z.string().optional(),
	linkedinUrl: z
		.string()
		.optional()
		.refine(
			(url) => {
				if (!url) return true; // Allows undefined values
				const linkedInRegex =
					/^https?:\/\/([\w]+\.)?linkedin\.com\/in\/[\w\-._]+\/?$/;
				return linkedInRegex.test(url);
			},
			{ message: "Please provide a valid LinkedIn profile URL" },
		),
	location: z.string().optional(),
	bio: z.string().optional(),
	skills: z.array(z.string()),
	interests: z.array(z.string()),
	lastActive: z.date().default(() => new Date()),
});

const predefinedDegrees = [
	"Bachelor of Science (B.Sc)",
	"Bachelor of Arts (B.A)",
	"Master of Science (M.Sc)",
	"Master of Business Administration (MBA)",
	"Doctor of Philosophy (Ph.D.)",
];

export const educationSchema = z.object({
	degree: z
		.string()
		.refine((val) => predefinedDegrees.includes(val) || val.trim().length > 0, {
			message: "Please select or enter a valid degree",
		}),
	fieldOfStudy: z.string(),
	university: z.string(),
	startYear: z.number(),
	endYear: z.number(),
	achievements: z.array(z.string()),
});

export const employmentSchema = z.object({
	company: z.string(),
	position: z.string(),
	industry: z.string(),
	location: z.string().optional(),
	startDate: z.date(),
	endDate: z.date().optional(),
	isCurrent: z.boolean().default(true),
	description: z.string().optional(),
});

interface NavLinks {
	name: string;
	href: string;
	icon: LucideIcon;
}

export const navLinks: NavLinks[] = [
	{
		name: "Home",
		href: "/",
		icon: House,
	},
	{
		name: "Profile",
		href: "/profile",
		icon: UserRound,
	},
	{
		name: "Network",
		href: "/network",
		icon: UsersRound,
	},
	{
		name: "Settings",
		href: "/settings",
		icon: Settings,
	},
];

interface Viewer {
	id: string;
	emailVerified?: boolean | null;
	connections: {
		id: string;
	}[];
}
export function shouldShowField(
	viewer: Viewer,
	userId: string,
	visibility: "PUBLIC" | "ALUMNI_ONLY" | "PRIVATE",
): boolean {
	if (visibility === "PUBLIC") return true;
	if (!viewer) return false;
	if (visibility === "PRIVATE") return viewer.id === userId;
	if (visibility === "ALUMNI_ONLY") {
		return (
			viewer.emailVerified === true &&
			viewer.connections.some((c) => c.id === userId)
		);
	}
	return false;
}

export interface UserPreview {
	id: string;
	name: string;
	email: string;
	image: string | null;
	linkedinUrl?: string | null;
	bio?: string | null;
}
