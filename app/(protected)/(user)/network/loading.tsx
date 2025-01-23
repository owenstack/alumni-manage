export default function Loading() {
	return (
		<>
			<div className="md:max-w-md md:absolute md:right-4 backdrop-blur-sm h-10 rounded-md animate-pulse bg-muted" />
			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
				{[...Array(6)].map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: index is not used for rendering
						key={i}
						className="flex flex-col gap-4 p-6 rounded-lg border animate-pulse bg-card"
					>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-full bg-muted" />
							<div className="flex-1">
								<div className="h-4 w-24 bg-muted rounded" />
								<div className="h-3 w-32 bg-muted rounded mt-2" />
							</div>
						</div>
						<div className="space-y-2">
							<div className="h-3 w-full bg-muted rounded" />
							<div className="h-3 w-4/5 bg-muted rounded" />
						</div>
						<div className="flex gap-2">
							<div className="h-9 w-full bg-muted rounded" />
							<div className="h-9 w-9 bg-muted rounded" />
						</div>
					</div>
				))}
			</section>
			<div className="flex justify-center mt-8">
				<div className="flex gap-2">
					{[...Array(3)].map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: index is not used for rendering
						<div key={i} className="w-9 h-9 rounded bg-muted animate-pulse" />
					))}
				</div>
			</div>
		</>
	);
}
