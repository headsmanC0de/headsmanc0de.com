import type { Locale } from "@/lib/dictionaries";

export const PROFESSIONAL_START_DATE = new Date(Date.UTC(2021, 7, 1));

interface ExperienceDuration {
	years: number;
	months: number;
}

export function getProfessionalExperience(
	now = new Date(),
	start = PROFESSIONAL_START_DATE
): ExperienceDuration {
	const utcNow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
	let totalMonths =
		(utcNow.getUTCFullYear() - start.getUTCFullYear()) * 12 +
		utcNow.getUTCMonth() -
		start.getUTCMonth();

	if (utcNow.getUTCDate() < start.getUTCDate()) {
		totalMonths -= 1;
	}

	const safeMonths = Math.max(0, totalMonths);

	return {
		years: Math.floor(safeMonths / 12),
		months: safeMonths % 12,
	};
}

function ukrainianUnit(value: number, forms: [string, string, string]): string {
	const lastTwo = value % 100;
	const last = value % 10;

	if (lastTwo >= 11 && lastTwo <= 14) return forms[2];
	if (last === 1) return forms[0];
	if (last >= 2 && last <= 4) return forms[1];
	return forms[2];
}

export function formatProfessionalExperience(
	locale: Locale,
	duration = getProfessionalExperience()
): string {
	const { years, months } = duration;

	if (locale === "uk") {
		const yearPart = `${years} ${ukrainianUnit(years, ["рік", "роки", "років"])}`;
		if (months === 0) return yearPart;
		return `${yearPart} ${months} ${ukrainianUnit(months, ["місяць", "місяці", "місяців"])}`;
	}

	const yearPart = `${years} ${years === 1 ? "year" : "years"}`;
	if (months === 0) return yearPart;
	return `${yearPart} ${months} ${months === 1 ? "month" : "months"}`;
}
