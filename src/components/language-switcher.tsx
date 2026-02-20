"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/dictionaries";

interface LanguageSwitcherProps {
	lang: Locale;
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
	const router = useRouter();
	const pathname = usePathname();

	const switchLocale = () => {
		const newLang = lang === "en" ? "uk" : "en";
		const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
		router.push(newPath);
	};

	return (
		<Button variant="ghost" size="icon" onClick={switchLocale}>
			<span className="text-xs font-bold">{lang === "en" ? "UK" : "EN"}</span>
			<span className="sr-only">Switch language</span>
		</Button>
	);
}
