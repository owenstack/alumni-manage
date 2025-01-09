"use client";

import { useSession } from "@/lib/auth.client";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/constant";
import { Bell, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Header() {
	const pathname = usePathname();
	const { data } = useSession();
	return (
		<header className="flex items-center justify-between top-0 sticky gap-2 md:gap-4 px-4 py-2 border-b">
			<Logo />
			<div className="flex gap-4">
				<nav className="flex gap-2">
					<div className="hidden md:flex">
						{navLinks.map(({ name, href }) => (
							<Button key={name} variant={"link"}>
								<Link
									href={href}
									className={cn(pathname === href ? "underline" : "")}
								>
									{name}
								</Link>
							</Button>
						))}
					</div>
					<div className="flex md:hidden gap-1">
						{navLinks.map(({ name, href, icon: Icon }) => (
							<Tooltip key={name}>
								<TooltipTrigger
									className={buttonVariants({
										variant: pathname === href ? "outline" : "secondary",
										size: "icon",
									})}
								>
									<Link href={href}>
										<Icon />
									</Link>
								</TooltipTrigger>
								<TooltipContent>{name}</TooltipContent>
							</Tooltip>
						))}
					</div>
					<div className="flex gap-1">
						<Tooltip>
							<TooltipTrigger
								className={buttonVariants({
									variant: "secondary",
									size: "icon",
								})}
							>
								<Link href={"/messages"}>
									<MessageCircleMore />
								</Link>
							</TooltipTrigger>
							<TooltipContent>Messages</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger
								className={buttonVariants({
									variant: "secondary",
									size: "icon",
								})}
							>
								<Link href={"/activity"}>
									<Bell />
								</Link>
							</TooltipTrigger>
							<TooltipContent>Activity history</TooltipContent>
						</Tooltip>
					</div>
				</nav>
				<Avatar>
					<AvatarImage src={data?.user.image ?? ""} />
					<AvatarFallback>{data?.user.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}
