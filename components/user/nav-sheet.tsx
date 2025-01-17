"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constant";
import { useSession } from "@/lib/auth.client";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export function NavSheet() {
	const { data } = useSession();
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild className="md:hidden">
				<Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
					<AvatarImage src={data?.user.image ?? ""} />
					<AvatarFallback className="bg-primary text-primary-foreground">
						{data?.user.name.charAt(0)}
					</AvatarFallback>
				</Avatar>
			</SheetTrigger>
			<SheetContent className="w-[300px] sm:w-[400px]">
				<SheetHeader className="border-b pb-4">
					<div className="flex items-center gap-3">
						<Avatar className="h-12 w-12">
							<AvatarImage src={data?.user.image ?? ""} />
							<AvatarFallback className="bg-primary text-primary-foreground text-lg">
								{data?.user.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<SheetTitle className="text-sm font-semibold">
								{data?.user.name}
							</SheetTitle>
							<p className="text-sm text-muted-foreground font-light">
								{data?.user.email}
							</p>
						</div>
					</div>
				</SheetHeader>
				<div className="grid gap-2 p-4">
					{navLinks.map(({ name, href, icon: Icon }) => (
						<Button
							key={name}
							variant={pathname === href ? "default" : "ghost"}
							className="w-full justify-start"
							asChild
						>
							<Link href={href} className="flex gap-2 items-center">
								<Icon className="h-4 w-4" />
								<span>{name}</span>
							</Link>
						</Button>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}
