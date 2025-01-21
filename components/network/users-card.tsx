"use client";

import type { UserPreview } from "@/lib/constant";
import { AtSign, TextSelect } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export function UsersCard({ user }: { user: UserPreview }) {
	const router = useRouter();
	return (
		<Card className="relative mt-12 transition-all hover:shadow-lg">
			<Avatar className="w-24 h-24 absolute -top-12 left-1/2 transform -translate-x-1/2 border-4 border-background">
				<AvatarImage src={user.image ?? ""} />
				<AvatarFallback className="text-lg font-semibold">
					{user.name.charAt(0)}
				</AvatarFallback>
			</Avatar>
			<CardHeader className="pt-16 text-center">
				<CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
				<CardDescription className="text-sm">{user.email}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{user.bio && (
					<div className="flex items-center gap-3 text-sm">
						<TextSelect className="h-4 w-4 text-primary" />
						<p className="text-muted-foreground">{user.bio}</p>
					</div>
				)}
				{user.linkedinUrl && (
					<div className="flex items-center gap-3 text-sm">
						<AtSign className="h-4 w-4 text-primary" />
						<Link
							href={user.linkedinUrl}
							className="text-muted-foreground hover:text-primary transition-colors"
						>
							{user.linkedinUrl}
						</Link>
					</div>
				)}
			</CardContent>
			<CardFooter className="justify-center">
				<Button
					variant="outline"
					size="lg"
					className="group"
					onClick={() => router.push(`/network/${user.id}`)}
				>
					View profile &rarr;
				</Button>
			</CardFooter>
		</Card>
	);
}
