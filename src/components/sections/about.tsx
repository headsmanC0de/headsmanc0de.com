interface AboutDict {
	title: string;
	description: string;
}

interface AboutSectionProps {
	dict: AboutDict;
}

export function AboutSection({ dict }: AboutSectionProps) {
	return (
		<section className="space-y-3 print:space-y-2">
			<h2 className="text-2xl font-semibold tracking-tight print:text-xl">{dict.title}</h2>
			<p className="text-muted-foreground leading-relaxed print:text-sm">{dict.description}</p>
		</section>
	);
}
