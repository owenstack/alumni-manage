"use client";

import { useSession } from "@/lib/auth.client";
import type {
	Education,
	Employment,
	Profile,
	ProfilePrivacy,
} from "@prisma/client";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { EducationDialog } from "./education-dialog";
import { EmploymentDialog } from "./employment-dialog";
import { InterestDialog } from "./interest-dialog";
import { Privacy } from "./privacy";
import { SkillDialog } from "./skills-dialog";
import { UpdatePhoto } from "./update-photo";
import { UpdateProfile } from "./update-profile";

interface FeatureCards {
	title: string;
	subtitle: string;
	cta: React.ReactElement;
}

export default function ProfileMain({
	profile,
	education,
	employment,
	privacy,
}: {
	profile: Profile;
	education: Education[];
	employment: Employment[];
	privacy: ProfilePrivacy;
}) {
	const cards: FeatureCards[] = [
		{
			title: "Interests",
			subtitle: "Share your hobbies to connect with like-minded people",
			cta: <InterestDialog interests={profile.interests} />,
		},
		{
			title: "Skills",
			subtitle: "Let others know what you're good at",
			cta: <SkillDialog skills={profile.skills} />,
		},
		{
			title: "Education",
			subtitle: "Add your education to your profile",
			cta: <EducationDialog education={education} />,
		},
		{
			title: "Employment",
			subtitle: "Share your work experience and career journey",
			cta: <EmploymentDialog employment={employment} />,
		},
	];
	const { data } = useSession();
	return (
		<>
			<h2 className="font-semibold text-2xl">Edit Profile</h2>
			<div className="grid gap-1">
				<h3>Your profile is {data?.user.completeness}% complete</h3>
				<Progress
					value={data?.user.completeness}
					max={100}
					className="w-full"
				/>
				<p className="text-muted-foreground text-sm">
					Profiles that are complete get 14x more views
				</p>
			</div>
			<section className="gap-2">
				<h3 className="font-semibold">Add profile section</h3>
				<div className="grid gap-2 p-4">
					{cards.map(({ title, subtitle, cta }) => (
						<Card key={title} className="flex items-center justify-between">
							<CardHeader>
								<CardTitle>{title}</CardTitle>
								<CardDescription>{subtitle}</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">{cta}</CardContent>
						</Card>
					))}
				</div>
			</section>
			<section className="gap-2">
				<h3 className="font-semibold">Profile</h3>
				<UpdatePhoto />
				<div className="grid gap-4 md:grid-cols-2">
					<UpdateProfile profile={profile} />
					<Privacy privacy={privacy} />
				</div>
			</section>
		</>
	);
}
