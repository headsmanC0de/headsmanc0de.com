import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { hasLocale, type Locale, locales } from "@/lib/dictionaries";
import "../globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://headsmanc0de.com"),
	title: "Nazariy Petryk — Full-Stack Software Engineer / Architect",
	description:
		"Portfolio and experience of Nazariy Petryk, a TypeScript-focused full-stack software engineer and architect.",
	alternates: {
		canonical: "https://headsmanc0de.com",
	},
};

export function generateStaticParams() {
	return locales.map((locale) => ({ lang: locale }));
}

interface LayoutProps {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
	const { lang } = await params;
	const locale: Locale = hasLocale(lang) ? lang : "en";

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
