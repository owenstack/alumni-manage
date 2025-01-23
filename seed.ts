import { faker } from "@faker-js/faker";
import prisma from "./lib/db";
import { nanoid } from "nanoid";
import { VisibilityLevel } from "@prisma/client";

async function main() {
	try {
		// Create 10 users with profiles and privacy settings
		for (let i = 0; i < 20; i++) {
			const userId = nanoid();
			const user = await prisma.user.create({
				data: {
					id: userId,
					name: faker.person.fullName(),
					email: faker.internet.email(),
					emailVerified: true,
					createdAt: faker.date.past(),
					updatedAt: new Date(),
					onboarded: true,
					completeness: faker.number.int({ min: 25, max: 100 }),
					profile: {
						create: {
							phone: faker.phone.number(),
							linkedinUrl: faker.internet.url(),
							location: faker.location.city(),
							bio: faker.lorem.paragraph(),
							skills: faker.helpers.arrayElements(
								["JavaScript", "Python", "React", "Node.js", "SQL"],
								3,
							),
							interests: faker.helpers.arrayElements(
								["Technology", "AI", "Web Development", "Data Science"],
								2,
							),
							lastActive: faker.date.recent(),
							privacy: {
								create: {
									phoneVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									linkedinVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									locationVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									bioVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									educationVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									employmentVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									skillsVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									interestsVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									defaultVisibility: faker.helpers.arrayElement(
										Object.values(VisibilityLevel),
									),
									searchable: true,
								},
							},
						},
					},
				},
			});
		}

		// Create connections between users
		const users = await prisma.user.findMany();

		for (const user of users) {
			// Randomly connect with 2-5 other users
			const numberOfConnections = faker.number.int({ min: 5, max: 10 });
			const otherUsers = users.filter((u) => u.id !== user.id);
			const selectedUsers = faker.helpers.arrayElements(
				otherUsers,
				numberOfConnections,
			);

			await prisma.user.update({
				where: { id: user.id },
				data: {
					connections: {
						connect: selectedUsers.map((u) => ({ id: u.id })),
					},
				},
			});

			// Create some connection requests
			const remainingUsers = otherUsers.filter(
				(u) => !selectedUsers.includes(u),
			);
			const requestUsers = faker.helpers.arrayElements(remainingUsers, 2);

			for (const requestUser of requestUsers) {
				await prisma.connectionRequest.create({
					data: {
						senderId: user.id,
						recipientId: requestUser.id,
						status: faker.helpers.arrayElement([
							"PENDING",
							"ACCEPTED",
							"REJECTED",
						]),
						createdAt: faker.date.recent(),
						updatedAt: new Date(),
					},
				});
			}
		}

		console.log("Seed completed successfully");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		await prisma.$disconnect();
	}
}

main();
