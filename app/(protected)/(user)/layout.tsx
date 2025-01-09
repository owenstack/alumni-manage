import { Header } from "@/components/profile/header";

export default function UserLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
