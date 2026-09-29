import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeroDict {
	greeting: string;
	name: string;
	title: string;
	subtitle: string;
	experienceLabel: string;
	sinceLabel: string;
}

interface HeroSectionProps {
	dict: HeroDict;
	experience: string;
}

export function HeroSection({ dict, experience }: HeroSectionProps) {
	return (
		<section className="grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end print:grid-cols-[1fr_auto] print:gap-4 print:py-4">
			<div className="flex items-center gap-6">
				<Avatar className="size-36 shrink-0 ring-1 ring-border print:size-24">
					<AvatarImage src="/avatar.jpg" alt={dict.name} />
					<AvatarFallback className="text-3xl">
						{dict.name
							.split(" ")
							.map((n) => n[0])
							.join("")
							.slice(0, 2)}
					</AvatarFallback>
				</Avatar>
				<div className="space-y-2">
					<p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
						{dict.greeting}
					</p>
					<h1 className="text-3xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-4xl print:text-3xl">
						{dict.name}
					</h1>
					<p className="text-base leading-snug text-foreground/85 sm:text-lg print:text-base">
						{dict.title}
					</p>
					<p className="max-w-xl text-xs leading-snug text-muted-foreground sm:text-sm print:text-xs">
						{dict.subtitle}
					</p>
				</div>
			</div>
			<div className="experience-signal min-w-52 rounded-xl border bg-card p-5 print:min-w-44 print:p-3">
				<p className="font-mono text-2xl font-semibold tracking-tight print:text-lg">
					{experience}
				</p>
				<p className="mt-1 text-xs text-muted-foreground">{dict.experienceLabel}</p>
				<p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground print:mt-1">
					{dict.sinceLabel}
				</p>
			</div>
		</section>
	);
}
