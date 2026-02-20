import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "uk"] as const;
const defaultLocale = "en";

type Locale = (typeof locales)[number];

function getLocaleFromRequest(request: NextRequest): Locale {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value;
	});

	// Get languages from Accept-Language header, fallback to empty array
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	// If no valid languages, return default
	if (!languages || languages.length === 0 || languages[0] === "*") {
		return defaultLocale;
	}

	try {
		const locale = matchLocale(languages, locales, defaultLocale);
		return locale as Locale;
	} catch {
		return defaultLocale;
	}
}

export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Skip _next paths and static files
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.includes(".") // static files
	) {
		return;
	}

	// Check if pathname already has a locale
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) {
		return;
	}

	// Detect locale and redirect
	const locale = getLocaleFromRequest(request);
	const newUrl = new URL(`/${locale}${pathname}`, request.url);

	return NextResponse.redirect(newUrl);
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
