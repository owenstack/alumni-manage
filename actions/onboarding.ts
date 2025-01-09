"use server";

import { auth } from "@/lib/auth";
import {
	educationSchema,
	employmentSchema,
	profileSchema,
} from "@/lib/constant";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import type { z } from "zod";

export async function submitProfile(values: z.infer<typeof profileSchema>) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const { data, error } = await profileSchema.safeParseAsync(values);
		if (error) return { error: error.issues[0].message };
		const profile = await prisma.profile.create({
			data: { ...data, userId: authz.user.id },
		});
		if (!profile) return { error: "Failed to create profile" };
		const { status } = await auth.api.updateUser({
			body: { completeness: 50 },
			headers: await headers(),
		});
		if (!status) return { error: "Failed to update completeness" };
		return { success: true, message: "Profile created successfully" };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}
export async function submitEducation(values: z.infer<typeof educationSchema>) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const { data, error } = await educationSchema.safeParseAsync(values);
		if (error) return { error: error.issues[0].message };
		const education = await prisma.education.create({
			data: { ...data, userId: authz.user.id },
		});
		if (!education) return { error: "Failed to create education" };
		const { status } = await auth.api.updateUser({
			body: { completeness: 75 },
			headers: await headers(),
		});
		if (!status) return { error: "Failed to update completeness" };
		return { success: true, message: "Education added successfully" };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}

export async function submitEmployment(
	values: z.infer<typeof employmentSchema>,
) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const { data, error } = await employmentSchema.safeParseAsync(values);
		if (error) return { error: error.issues[0].message };
		const employment = await prisma.employment.create({
			data: { ...data, userId: authz.user.id },
		});
		if (!employment) return { error: "Failed to create employment" };
		const { status } = await auth.api.updateUser({
			body: { completeness: 100, onboarding: true },
			headers: await headers(),
		});
		if (!status) return { error: "Failed to update completeness" };
		return { success: true, message: "Employment added successfully" };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}
