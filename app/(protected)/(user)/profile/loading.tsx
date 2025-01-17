export default function Loading() {
	return (
		<>
			<h2 className="font-semibold text-2xl">
				<span className="sr-only">Edit Profile</span>
				<span aria-hidden="true">Edit Profile</span>
			</h2>
			<div className="grid gap-1">
				<h3 className="animate-pulse bg-muted h-4 w-48 rounded">
					<span className="sr-only">Loading profile section</span>
				</h3>
				<div className="h-4 bg-muted rounded animate-pulse" />
				<p className="text-muted-foreground text-sm animate-pulse bg-muted h-4 w-64 rounded" />
			</div>
			<section className="gap-2">
				<h3 className="font-semibold">
					<span className="sr-only">Add profile section</span>
					<span aria-hidden="true">Add profile section</span>
				</h3>
				<div className="grid gap-2 p-4">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="flex items-center justify-between p-6 border rounded-lg"
						>
							<div>
								<div className="h-6 bg-muted rounded w-32 mb-2 animate-pulse" />
								<div className="h-4 bg-muted rounded w-64 animate-pulse" />
							</div>
							<div className="h-10 w-24 bg-muted rounded animate-pulse" />
						</div>
					))}
				</div>
			</section>
			<section className="gap-2">
				<h3 className="font-semibold">
					<span className="sr-only">Profile</span>
					<span aria-hidden="true">Profile</span>
				</h3>
				<div className="h-48 bg-muted rounded animate-pulse mb-4" />
				<div className="grid gap-4 md:grid-cols-2">
					<div className="h-96 bg-muted rounded animate-pulse" />
					<div className="h-96 bg-muted rounded animate-pulse" />
				</div>
			</section>
		</>
	);
}
