//TODO: Add Ghost mode {toggle searchable in profilePrivacy model}

import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
	return (
		<main className="flex flex-col gap-4 md:gap-6 mx-4 md:mx-6 py-4">
			Settings
			<ThemeToggle />
		</main>
	);
}
