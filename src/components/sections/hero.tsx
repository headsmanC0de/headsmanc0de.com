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
			<div className="space-y-5">
				<div className="flex items-center gap-3">
					<Avatar className="size-20 ring-1 ring-border print:size-14">
						<AvatarImage src="/avatar.jpg" alt={dict.name} />
						<AvatarFallback className="text-xl">
							{dict.name
								.split(" ")
								.map((n) => n[0])
								.join("")
								.slice(0, 2)}
						</AvatarFallback>
					</Avatar>
					<p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
						{dict.greeting}
					</p>
				</div>
				<div className="space-y-3">
					<h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-6xl print:text-3xl">
						{dict.name}
					</h1>
					<p className="max-w-2xl text-xl leading-snug text-foreground/85 print:text-base">
						{dict.title}
					</p>
					<p className="text-sm text-muted-foreground print:text-xs">{dict.subtitle}</p>
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
