"use client";

import LinkedIn from "@/assets/icons/linkedin";
import type { ProfilePrivacy, VisibilityLevel } from "@prisma/client";
import {
	BookMarked,
	BriefcaseBusiness,
	MapPin,
	Phone,
	SquareAsterisk,
	Text,
} from "lucide-react";
import { buttonVariants } from "../ui/button";
import { EnumDropdown } from "./enum-dropdown";

const privacyEnum = (value: VisibilityLevel) => {
	return value === "ALUMNI_ONLY"
		? "Visible to connections"
		: value === "PRIVATE"
			? "Visible to only you"
			: "Visible to everyone";
};

interface Privacy {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
	cta: React.ReactElement;
}

export function Privacy({ privacy }: { privacy: ProfilePrivacy }) {
	const privacyArray: Privacy[] = [
		{
			icon: <Phone className="size-6 text-primary" />,
			title: "Phone number",
			subtitle: privacyEnum(privacy.phoneVisibility),
			cta: <EnumDropdown field="phoneVisibility" id={privacy.id} />,
		},
		{
			icon: <LinkedIn className="size-6 text-primary" />,
			title: "LinkedIn URL",
			subtitle: privacyEnum(privacy.linkedinVisibility),
			cta: <EnumDropdown field="linkedinVisibility" id={privacy.id} />,
		},
		{
			icon: <MapPin className="size-6 text-primary" />,
			title: "Location",
			subtitle: privacyEnum(privacy.locationVisibility),
			cta: <EnumDropdown field="locationVisibility" id={privacy.id} />,
		},
		{
			icon: <Text className="size-6 text-primary" />,
			title: "Bio",
			subtitle: privacyEnum(privacy.bioVisibility),
			cta: <EnumDropdown field="bioVisibility" id={privacy.id} />,
		},
		{
			icon: <BookMarked className="size-6 text-primary" />,
			title: "Education",
			subtitle: privacyEnum(privacy.educationVisibility),
			cta: <EnumDropdown field="educationVisibility" id={privacy.id} />,
		},
		{
			icon: <BriefcaseBusiness className="size-6 text-primary" />,
			title: "Employment",
			subtitle: privacyEnum(privacy.employmentVisibility),
			cta: <EnumDropdown field="employmentVisibility" id={privacy.id} />,
		},
		{
			icon: <SquareAsterisk className="size-6 text-primary" />,
			title: "Skills",
			subtitle: privacyEnum(privacy.skillsVisibility),
			cta: <EnumDropdown field="skillsVisibility" id={privacy.id} />,
		},
		{
			icon: <Phone className="size-6 text-primary" />,
			title: "Interests",
			subtitle: privacyEnum(privacy.interestsVisibility),
			cta: <EnumDropdown field="interestsVisibility" id={privacy.id} />,
		},
	];

	return (
		<section className="grid gap-2">
			<h3 className="font-semibold">Profile Privacy</h3>
			{privacyArray.map(({ icon, title, subtitle, cta }) => (
				<div key={title} className="flex items-center gap-2 justify-between">
					<div className="flex items-center gap-2">
						<div className={buttonVariants({ variant: "secondary" })}>
							{icon}
						</div>
						<div>
							<h3>{title}</h3>
							<p className="text-muted-foreground text-sm">{subtitle}</p>
						</div>
					</div>
					{cta}
				</div>
			))}
		</section>
	);
}
