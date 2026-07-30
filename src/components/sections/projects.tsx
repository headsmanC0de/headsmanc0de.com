import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
	name: string;
	url: string;
	type: string;
	description: string;
	stack: string[];
}

interface ProjectsDict {
	title: string;
	intro: string;
	visit: string;
	items: ProjectItem[];
}

interface ProjectsSectionProps {
	dict: ProjectsDict;
}

export function ProjectsSection({ dict }: ProjectsSectionProps) {
	return (
		<section className="space-y-4 print:space-y-3">
			<div className="space-y-1">
				<h2 className="text-2xl font-semibold tracking-tight print:text-xl">{dict.title}</h2>
				<p className="text-sm text-muted-foreground print:text-xs">{dict.intro}</p>
			</div>
			<div className="grid gap-3 md:grid-cols-2 print:grid-cols-2 print:gap-2">
				{dict.items.map((project) => (
					<a
						key={project.url}
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						className="group rounded-xl border bg-card p-5 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring print:break-inside-avoid print:p-3 print:shadow-none"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
									{project.type}
								</p>
								<h3 className="mt-1 font-semibold">{project.name}</h3>
							</div>
							<ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 print:hidden" />
						</div>
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground print:mt-2 print:text-xs">
							{project.description}
						</p>
						<div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.68rem] text-muted-foreground print:mt-2">
							{project.stack.map((item) => (
								<span key={item}>{item}</span>
							))}
						</div>
						<span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary print:hidden">
							{dict.visit}
							<ArrowUpRight className="size-3" />
						</span>
					</a>
				))}
			</div>
		</section>
	);
}
