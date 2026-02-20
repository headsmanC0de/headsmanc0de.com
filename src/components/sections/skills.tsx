import { Badge } from "@/components/ui/badge";

interface SkillsDict {
	title: string;
	technical: string;
	soft: string;
	items: {
		technical: string[];
		soft: string[];
	};
}

interface SkillsSectionProps {
	dict: SkillsDict;
}

export function SkillsSection({ dict }: SkillsSectionProps) {
	return (
		<section className="space-y-4 print:space-y-3">
			<h2 className="text-2xl font-semibold tracking-tight print:text-xl">{dict.title}</h2>
			<div className="grid gap-6 md:grid-cols-2 print:gap-4">
				<div className="space-y-2">
					<h3 className="font-medium text-muted-foreground print:text-sm">{dict.technical}</h3>
					<div className="flex flex-wrap gap-2">
						{dict.items.technical.map((skill) => (
							<Badge key={skill} variant="secondary" className="print:text-xs">
								{skill}
							</Badge>
						))}
					</div>
				</div>
				<div className="space-y-2">
					<h3 className="font-medium text-muted-foreground print:text-sm">{dict.soft}</h3>
					<div className="flex flex-wrap gap-2">
						{dict.items.soft.map((skill) => (
							<Badge key={skill} variant="outline" className="print:text-xs">
								{skill}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
