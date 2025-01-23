import { Logo } from "./logo";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function ErrorCard({ error }: { error: string }) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 h-screen">
			<Card className="w-full max-w-md p-4 text-center">
				<Logo className="w-fit place-self-center" />
				<CardHeader className="text-destructive">
					<CardTitle>Something went wrong</CardTitle>
					<CardDescription>Error: {error}</CardDescription>
				</CardHeader>
				<CardContent className="text-destructive-foreground">
					Please reload and try again.
				</CardContent>
			</Card>
		</div>
	);
}
