import type { Locale } from "@/lib/dictionaries";

interface EducationItem {
	institution: string;
	degree: string;
	period: string;
}

interface EducationDict {
	title: string;
	items: EducationItem[];
}

interface EducationSectionProps {
	dict: EducationDict;
	lang: Locale;
}

export function EducationSection({ dict }: EducationSectionProps) {
	return (
		<section className="space-y-4 print:space-y-3">
			<h2 className="text-2xl font-semibold tracking-tight print:text-xl">{dict.title}</h2>
			<div className="space-y-4 print:space-y-3">
				{dict.items.map((item, index) => (
					<div key={`${item.institution}-${index}`} className="space-y-1">
						<div className="flex flex-wrap items-baseline justify-between gap-2">
							<h3 className="font-semibold print:text-sm">{item.institution}</h3>
							<span className="text-sm text-muted-foreground print:text-xs">{item.period}</span>
						</div>
						<p className="text-muted-foreground print:text-sm">{item.degree}</p>
					</div>
				))}
			</div>
		</section>
	);
}
