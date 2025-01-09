import {
	adminClient,
	emailOTPClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
const authClient = createAuthClient({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: `https://${process.env.VERCEL_URL}`,
	plugins: [
		adminClient(),
		emailOTPClient(),
		inferAdditionalFields<typeof auth>(),
	],
});

export const {
	useSession,
	deleteUser,
	updateUser,
	signIn,
	signOut,
	signUp,
	sendVerificationEmail,
	getSession,
	linkSocial,
	listSessions,
	revokeSession,
	revokeSessions,
	revokeOtherSessions,
	admin,
	listAccounts,
	changeEmail,
	changePassword,
	emailOtp,
	verifyEmail,
	forgetPassword,
	resetPassword,
} = authClient;
