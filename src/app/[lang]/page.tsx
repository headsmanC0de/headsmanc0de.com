import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { AboutSection } from "@/components/sections/about";
import { ContactsSection } from "@/components/sections/contacts";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { Separator } from "@/components/ui/separator";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import {
	formatProfessionalExperience,
	getProfessionalExperience,
} from "@/lib/professional-experience";

export const revalidate = 86400;

interface PageProps {
	params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: PageProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const locale: Locale = lang;
	const dict = await getDictionary(locale);
	const experience = formatProfessionalExperience(locale, getProfessionalExperience());

	return (
		<main className="min-h-screen bg-background print:min-h-0 print:bg-white">
			{/* Header with controls - hidden in print */}
			<header className="fixed right-4 top-4 z-50 flex gap-2 print:hidden">
				<LanguageSwitcher lang={locale} />
				<ModeToggle />
			</header>

			{/* Resume content - A4 optimized */}
			<div className="mx-auto max-w-[224mm] px-6 py-8 sm:px-8 print:max-w-none print:p-0">
				<HeroSection dict={dict.hero} experience={experience} />
				<Separator className="my-6 print:my-4" />
				<AboutSection dict={dict.about} />
				<Separator className="my-6 print:my-4" />
				<SkillsSection dict={dict.skills} />
				<Separator className="my-6 print:my-4" />
				<ProjectsSection dict={dict.projects} />
				<Separator className="my-6 print:my-4" />
				<ExperienceSection dict={dict.experience} />
				<Separator className="my-6 print:my-4" />
				<EducationSection dict={dict.education} />
				<Separator className="my-6 print:my-4" />
				<ContactsSection dict={dict.contacts} />
			</div>
		</main>
	);
}
