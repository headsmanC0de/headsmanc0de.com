import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeroDict {
	greeting: string;
	name: string;
	title: string;
	subtitle: string;
}

interface HeroSectionProps {
	dict: HeroDict;
}

export function HeroSection({ dict }: HeroSectionProps) {
	return (
		<section className="flex flex-col items-center gap-4 py-8 text-center print:py-4">
			<Avatar className="size-24 print:size-20">
				<AvatarImage src="/avatar.webp" alt={dict.name} />
				<AvatarFallback className="text-2xl print:text-xl">
					{dict.name
						.split(" ")
						.map((n) => n[0])
						.join("")
						.slice(0, 2)}
				</AvatarFallback>
			</Avatar>
			<div className="space-y-2">
				<h1 className="text-4xl font-bold tracking-tight print:text-3xl">
					{dict.greeting} <span className="text-primary">{dict.name}</span>
				</h1>
				<p className="text-xl text-muted-foreground print:text-lg">{dict.title}</p>
				<p className="text-sm text-muted-foreground print:text-xs">{dict.subtitle}</p>
			</div>
		</section>
	);
}
