"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Button } from "../ui/button";

export function Pagination({
	totalPages,
	page,
}: { totalPages: number; page: number }) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams],
	);

	const handlePageChange = useCallback(
		(newPage: number) => {
			if (newPage < 1 || newPage > totalPages) return;
			router.push(
				`${pathname}?${createQueryString("page", newPage.toString())}`,
			);
		},
		[pathname, router, createQueryString, totalPages],
	);

	const pageNumbers = useMemo(() => {
		const pages = [];
		const start = Math.max(1, Math.min(page - 1, totalPages - 2));
		const end = Math.min(totalPages, Math.max(page + 1, 3));

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	}, [page, totalPages]);

	return (
		<div className="flex items-center gap-2 justify-evenly w-fit fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
			<Button
				size={"icon"}
				variant={"outline"}
				onClick={() => handlePageChange(page - 1)}
				disabled={page === 1}
			>
				<ArrowBigLeft className="h-4 w-4" />
			</Button>
			{pageNumbers.map((pageNum) => (
				<Button
					key={pageNum}
					variant={pageNum === page ? "default" : "outline"}
					onClick={() => handlePageChange(pageNum)}
					className="w-8 h-8"
					size={"icon"}
				>
					{pageNum}
				</Button>
			))}
			<Button
				size={"icon"}
				variant={"outline"}
				onClick={() => handlePageChange(page + 1)}
				disabled={page === totalPages}
			>
				<ArrowBigRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
