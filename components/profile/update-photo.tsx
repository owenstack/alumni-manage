"use client";

import { FileUp, User } from "lucide-react";
import { FileUpload } from "../file-upload";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSession, updateUser } from "@/lib/auth.client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function UpdatePhoto() {
	const { data } = useSession();
	const { toast } = useToast();
	const [update, setUpdate] = useState(false);

	return (
		<div className="flex items-center gap-2 my-4">
			{!update ? (
				<div
					className="group relative cursor-pointer"
					onClick={() => setUpdate(!update)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === "Space") {
							setUpdate(!update);
						}
					}}
					aria-label="Update profile photo"
				>
					<Avatar className="h-24 w-24 transition-opacity group-hover:opacity-50">
						<AvatarImage src={data?.user.image ?? ""} alt="Profile photo" />
						<AvatarFallback>
							<User className="h-12 w-12" />
						</AvatarFallback>
					</Avatar>
					<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
						<FileUp className="h-8 w-8" />
					</div>
				</div>
			) : (
				<div className="w-24 h-24 rounded-full border">
					<FileUpload
						accept="image/*"
						onSuccess={async (url) => {
							try {
								await updateUser(
									{ image: url },
									{
										onSuccess: () => {
											toast({
												title: "Success",
												description: "Profile image updated successfully",
											});
											setUpdate(false);
										},
										onError: (ctx) => {
											toast({
												title: "Something went wrong",
												description: ctx.error.message,
												variant: "destructive",
											});
										},
									},
								);
							} catch (error) {
								console.error(error);
								toast({
									title: "Something went wrong",
									description:
										error instanceof Error
											? error.message
											: "Internal server error",
									variant: "destructive",
								});
							}
						}}
						onError={(err) => {
							toast({
								title: "Something went wrong",
								description: err,
								variant: "destructive",
							});
						}}
					/>
				</div>
			)}
			<div>
				<h3>Profile photo</h3>
				<p className="text-muted-foreground text-sm">Visible to everyone</p>
			</div>
		</div>
	);
}
