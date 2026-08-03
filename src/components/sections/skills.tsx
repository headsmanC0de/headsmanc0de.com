import { Badge } from "@/components/ui/badge";

interface SkillsDict {
	title: string;
	groups: {
		title: string;
		items: string[];
		kind?: string;
	}[];
}

interface SkillsSectionProps {
	dict: SkillsDict;
}

export function SkillsSection({ dict }: SkillsSectionProps) {
	return (
		<section className="space-y-4 print:space-y-3">
			<h2 className="text-2xl font-semibold tracking-tight print:text-xl">{dict.title}</h2>
			<div className="grid gap-6 md:grid-cols-2 print:gap-4">
				{dict.groups.map((group) => (
					<div key={group.title} className="space-y-2">
						<h3 className="font-medium text-muted-foreground print:text-sm">{group.title}</h3>
						<div className="flex flex-wrap gap-2">
							{group.items.map((skill) => (
								<Badge
									key={skill}
									variant={group.kind === "competency" ? "outline" : "secondary"}
									className="print:text-xs"
								>
									{skill}
								</Badge>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
