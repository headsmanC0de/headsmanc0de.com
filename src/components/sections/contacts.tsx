import { Github, Globe, Linkedin, type LucideIcon, Mail, MapPin, Send } from "lucide-react";

interface ContactItem {
	type: string;
	value: string;
}

interface ContactsDict {
	title: string;
	email: string;
	phone: string;
	location: string;
	items: ContactItem[];
}

interface ContactsSectionProps {
	dict: ContactsDict;
}

const iconMap: Record<string, LucideIcon> = {
	email: Mail,
	location: MapPin,
	telegram: Send,
	linkedin: Linkedin,
	github: Github,
	website: Globe,
};

export function ContactsSection({ dict }: ContactsSectionProps) {
	return (
		<section className="space-y-4 print:space-y-3">
			<h2 className="text-2xl font-semibold tracking-tight print:text-xl">{dict.title}</h2>
			<div className="flex flex-wrap gap-4 print:gap-3">
				{dict.items.map((item, index) => {
					const Icon = iconMap[item.type] ?? Mail;
					return (
						<div key={`${item.type}-${index}`} className="flex items-center gap-2">
							<Icon className="size-4 text-muted-foreground print:size-3" />
							<span className="text-sm print:text-xs">{item.value}</span>
						</div>
					);
				})}
			</div>
		</section>
	);
}
