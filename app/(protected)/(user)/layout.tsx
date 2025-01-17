import { Header } from "@/components/user/header";

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
