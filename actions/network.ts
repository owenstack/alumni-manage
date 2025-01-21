"use server";

import { auth } from "@/lib/auth";
import { shouldShowField } from "@/lib/constant";
import prisma from "@/lib/db";
import type { VisibilityLevel } from "@prisma/client";
import { headers } from "next/headers";

export async function getUsers({
	page,
	limit,
	search,
}: { page: number; limit: number; search?: string }) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const skip = (page - 1) * limit;

		//Get viewer's connection status
		const viewer = await prisma.user.findUnique({
			where: { id: authz.user.id },
			include: { connections: true },
		});

		if (!viewer) return { error: "Failed to get user" };
		const baseQuery = {
			where: {
				AND: [
					// search conditions
					search
						? {
								OR: [
									{
										name: {
											contains: search,
											mode: "insensitive" as const,
										},
									},
									{
										profile: {
											location: {
												contains: search,
												mode: "insensitive" as const,
											},
										},
									},
								],
							}
						: {},
					// Only show searchable profiles
					{ profile: { privacy: { searchable: true } } },
				],
			},
			include: {
				profile: { include: { privacy: true } },
				education: true,
				employment: true,
			},
		};

		//Execute query with pagination
		const [users, total] = await Promise.all([
			prisma.user.findMany({ ...baseQuery, skip, take: limit }),
			prisma.user.count({ where: baseQuery.where }),
		]); //Filter private data based on viewer's status
		const sanitizedUsers = users.map((user) => ({
			id: user.id,
			name: user.name,
			image: user.image,
			email: user.email,
			linkedinUrl: shouldShowField(
				viewer,
				user.id,
				user.profile?.privacy?.linkedinVisibility as VisibilityLevel,
			)
				? user.profile?.linkedinUrl
				: null,
			bio: shouldShowField(
				viewer,
				user.id,
				user.profile?.privacy?.bioVisibility as VisibilityLevel,
			)
				? user.profile?.bio
				: null,
		}));

		return { users: sanitizedUsers, total };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}
