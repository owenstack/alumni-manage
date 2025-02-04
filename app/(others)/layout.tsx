import { NavBar } from "@/components/others/navbar";

export default function OtherLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
}
