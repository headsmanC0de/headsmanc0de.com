import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { hasLocale, type Locale, locales } from "@/lib/dictionaries";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Resume | CV",
	description: "Professional resume and portfolio",
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
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
