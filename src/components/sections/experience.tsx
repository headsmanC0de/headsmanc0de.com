interface ExperienceItem {
	company: string;
	position: string;
	period: string;
	description: string;
}

interface ExperienceDict {
	title: string;
	present: string;
	items: ExperienceItem[];
}

interface ExperienceSectionProps {
	dict: ExperienceDict;
}

export function ExperienceSection({ dict }: ExperienceSectionProps) {
	return (
		<section className="space-y-4 print:space-y-3">
			<h2 className="text-2xl font-semibold tracking-tight print:text-xl">{dict.title}</h2>
			<div className="space-y-6 print:space-y-4">
				{dict.items.map((item, index) => (
					<div
						key={`${item.company}-${index}`}
						className="relative pl-4 border-l-2 border-border print:pl-3"
					>
						<div className="space-y-1">
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="font-semibold print:text-sm">{item.position}</h3>
								<span className="text-sm text-muted-foreground print:text-xs">{item.period}</span>
							</div>
							<p className="text-muted-foreground print:text-sm">{item.company}</p>
							<p className="text-sm text-muted-foreground leading-relaxed print:text-xs">
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
