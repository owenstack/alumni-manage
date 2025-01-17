"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import type {
	Education,
	Employment,
	Profile,
	ProfilePrivacy,
	VisibilityLevel,
} from "@prisma/client";
import { submitEducation, submitEmployment } from "./onboarding";
import { educationSchema, employmentSchema } from "@/lib/constant";
import { revalidatePath } from "next/cache";

export async function updateInterests(interests: string[]) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const profile = await prisma.profile.update({
			where: { userId: authz.user.id },
			data: { interests },
		});
		if (!profile) return { error: "Failed to update profile" };
		revalidatePath("/profile");
		return { success: true, message: "Interests updated successfully" };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}

export async function updateSkills(skills: string[]) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const profile = await prisma.profile.update({
			where: { userId: authz.user.id },
			data: { skills },
		});
		if (!profile) return { error: "Failed to update profile" };
		revalidatePath("/profile");
		return { success: true, message: "Skills updated" };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}

export async function updateEducation(values: Education) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const alreadyExists = await prisma.education.findUnique({
			where: { id: values.id, userId: authz.user.id },
		});
		if (alreadyExists) {
			const { data, error } = await educationSchema.safeParseAsync(values);
			if (error) return { error: error.issues[0].message };
			const updated = await prisma.education.update({
				where: { id: values.id },
				data,
			});
			if (!updated) return { error: "Failed to update education" };
			return { success: true, message: "Education updated successfully" };
		}
		const { error, message, success } = await submitEducation(values);
		if (error) {
			return { error };
		}
		revalidatePath("/profile");
		return { success, message };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}

export async function updateEmployment(values: Employment) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const alreadyExists = await prisma.employment.findUnique({
			where: { id: values.id, userId: authz.user.id },
		});
		if (alreadyExists) {
			const { data, error } = await employmentSchema.safeParseAsync(values);
			if (error) return { error: error.issues[0].message };
			const updated = await prisma.employment.update({
				where: { id: values.id },
				data,
			});
			if (!updated) return { error: "Failed to update employment" };
			return { success: true, message: "Employment updated successfully" };
		}
		const { error, message, success } = await submitEmployment({
			...values,
			location: values.location as string | undefined,
			endDate: values.endDate as Date | undefined,
			description: values.description as string | undefined,
		});
		if (error) {
			return { error };
		}
		revalidatePath("/profile");
		return { success, message };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}

export async function updateProfile(values: Profile) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const profile = await prisma.profile.findUnique({
			where: { id: values.id, userId: authz.user.id },
		});
		if (!profile) return { error: "Profile does not exist" };
		const updatedProfile = await prisma.profile.update({
			where: { id: values.id },
			data: values,
		});
		if (!updatedProfile) return { error: "Failed to update profile" };
		revalidatePath("/profile");
		return { success: true, message: "Profile updated successfully" };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}

export async function updatePrivacy(values: {
	field: keyof ProfilePrivacy;
	visibility: VisibilityLevel;
	id: string;
}) {
	try {
		const authz = await auth.api.getSession({ headers: await headers() });
		if (!authz?.user) return { error: "Unauthorized" };
		const { field, id, visibility } = values;
		const privacy = await prisma.profilePrivacy.findUnique({ where: { id } });
		if (!privacy) return { error: "Could not find profile" };
		const updated = await prisma.profilePrivacy.update({
			where: { id },
			data: {
				[field]: visibility,
			},
		});
		if (!updated) return { error: "Could not update privacy" };
		revalidatePath("/profile");
		return { success: true, message: "Privacy updated successfully" };
	} catch (error) {
		console.error(error);
		return {
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}
