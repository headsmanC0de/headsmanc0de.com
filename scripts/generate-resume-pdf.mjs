/**
 * Generates resume PDFs (light + dark) from the live site.
 * SSOT: the site itself — the same content users see in the browser.
 *
 * Usage:
 *   bun scripts/generate-resume-pdf.mjs          # against http://localhost:3000
 *   BASE_URL=https://headsmanc0de.com bun scripts/generate-resume-pdf.mjs
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = new URL("../public/resume/", import.meta.url);

const VARIANTS = [
	{ theme: "light", file: "Nazariy-Petryk-Resume-Light.pdf" },
	{ theme: "dark", file: "Nazariy-Petryk-Resume-Dark.pdf" },
];

const browser = await chromium.launch();
try {
	await mkdir(OUT_DIR, { recursive: true });

	for (const { theme, file } of VARIANTS) {
		const context = await browser.newContext({
			colorScheme: theme,
			viewport: { width: 1280, height: 900 },
		});
		// next-themes reads `theme` from localStorage
		await context.addInitScript(
			(t) => localStorage.setItem("theme", t),
			theme,
		);
		const page = await context.newPage();
		await page.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });
		await page.evaluate(() => document.fonts.ready);
		// hide interactive controls so they don't repeat across PDF pages
		await page.addStyleTag({
			content:
				"header{display:none!important} *{transition:none!important;animation:none!important}",
		});
		// screen media keeps theme backgrounds; printBackground paints them
		await page.emulateMedia({ media: "screen" });
		await page.pdf({
			path: new URL(file, OUT_DIR).pathname,
			format: "A4",
			printBackground: true,
			margin: { top: "8mm", bottom: "8mm", left: "6mm", right: "6mm" },
		});
		await context.close();
		console.log(`✓ ${file} (${theme})`);
	}
} finally {
	await browser.close();
}
