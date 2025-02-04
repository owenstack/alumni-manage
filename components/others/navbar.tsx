import { ThemeToggle } from "../theme-toggle";
import { Logo } from "../logo";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function NavBar() {
	return (
		<header className="sticky top-0 flex items-center justify-between gap-4 px-4 py-2 z-10">
			<Logo />
			<nav className="hidden md:flex items-center justify-evenly">
				<Link
					href={"#features"}
					className={buttonVariants({ variant: "link" })}
				>
					Features
				</Link>
				<Link href={"/profile"} className={buttonVariants({ variant: "link" })}>
					Profile
				</Link>
			</nav>
			<div className="flex items-center gap-2">
				<Link href={"/profile"} className={buttonVariants({ size: "lg" })}>
					Get started
				</Link>
				<ThemeToggle />
			</div>
		</header>
	);
}
