import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export default function Page() {
	return (
		<main className="container mx-auto px-4 py-8">
			<section className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
				<div className="space-y-6">
					<h1 className="text-5xl font-bold tracking-tight text-primary">
						Connect & Collaborate Seamlessly
					</h1>
					<p className="text-xl text-muted-foreground max-w-lg">
						Build meaningful connections with a platform that prioritizes
						security, customization, and ease of use. Join thousands of
						satisfied users today.
					</p>
					<div className="flex gap-4">
						<Link href="/profile" className={buttonVariants({ size: "lg" })}>
							Get Started <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
						<Link
							href="/demo"
							className={buttonVariants({ size: "lg", variant: "outline" })}
						>
							Watch Demo
						</Link>
					</div>
				</div>
				<div className="relative">
					<Image
						src="/connect.jpg"
						alt="People connecting and collaborating"
						width={600}
						height={600}
						className="rounded-lg shadow-xl"
						priority
					/>
				</div>
			</section>

			<section className="py-16 space-y-8">
				<h2 className="text-3xl font-semibold text-center text-primary">
					Why Choose Us?
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<Card className="p-6 space-y-4">
						<Zap className="h-8 w-8 text-primary" />
						<h3 className="text-xl font-semibold">Lightning Fast Setup</h3>
						<p className="text-muted-foreground">
							Get started in minutes with our intuitive onboarding process
						</p>
					</Card>
					<Card className="p-6 space-y-4">
						<Shield className="h-8 w-8 text-primary" />
						<h3 className="text-xl font-semibold">Enterprise-Grade Security</h3>
						<p className="text-muted-foreground">
							Your data is protected with state-of-the-art encryption
						</p>
					</Card>
					<Card className="p-6 space-y-4">
						<Users className="h-8 w-8 text-primary" />
						<h3 className="text-xl font-semibold">Team Collaboration</h3>
						<p className="text-muted-foreground">
							Built for teams of all sizes with powerful collaboration tools
						</p>
					</Card>
				</div>
			</section>

			<section className="py-16 space-y-8">
				<h2 className="text-3xl font-semibold text-center text-primary mb-12">
					Trusted By Industry Leaders
				</h2>
				<p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
					Join the ranks of forward-thinking companies that have transformed
					their collaboration with our platform. From startups to enterprises,
					we're proud to serve diverse industries.
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
					<Card className="p-6 w-full max-w-[200px]">
						<div className="h-12 w-full bg-muted rounded flex items-center justify-center">
							<p className="text-sm font-medium text-muted-foreground">
								TechCorp Inc.
							</p>
						</div>
					</Card>
					<Card className="p-6 w-full max-w-[200px]">
						<div className="h-12 w-full bg-muted rounded flex items-center justify-center">
							<p className="text-sm font-medium text-muted-foreground">
								InnovateLabs
							</p>
						</div>
					</Card>
					<Card className="p-6 w-full max-w-[200px]">
						<div className="h-12 w-full bg-muted rounded flex items-center justify-center">
							<p className="text-sm font-medium text-muted-foreground">
								FutureWorks
							</p>
						</div>
					</Card>
					<Card className="p-6 w-full max-w-[200px]">
						<div className="h-12 w-full bg-muted rounded flex items-center justify-center">
							<p className="text-sm font-medium text-muted-foreground">
								GlobalTech
							</p>
						</div>
					</Card>
				</div>
				<div className="text-center mt-12">
					<p className="text-muted-foreground mb-6">
						Join over 10,000+ companies already revolutionizing their workflow
					</p>
					<Link
						href="/testimonials"
						className={buttonVariants({ variant: "outline" })}
					>
						See Success Stories <ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</div>
			</section>
		</main>
	);
}
