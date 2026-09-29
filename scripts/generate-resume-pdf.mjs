/**
 * Generates resume PDFs (light + dark) from the live site.
 * SSOT: the site itself — the same content users see in the browser.
 *
 * Usage:
 *   bun scripts/generate-resume-pdf.mjs          # against http://localhost:3000
 *   BASE_URL=https://headsmanc0de.com bun scripts/generate-resume-pdf.mjs
 */
import { mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = new URL("../public/resume/", import.meta.url);

// Chromium print pipeline ignores $HOME-located fonts and all webfonts — it only
// resolves families from fonts.conf dirs of the browser process HOME. So we run
// the browser with a controlled HOME that carries the brand fonts system-style.
const FONT_HOME = path.join(os.tmpdir(), "resume-fonts-home");
const FONT_DIR = path.join(FONT_HOME, ".local/share/fonts");
const FONT_CONF = path.join(os.tmpdir(), "resume-fonts.conf");

function setupFontHome() {
	const src = path.join(os.homedir(), ".local/share/fonts");
	mkdirSync(FONT_DIR, { recursive: true });
	mkdirSync(path.join(FONT_HOME, ".cache/fontconfig"), { recursive: true });
	for (const f of ["Manrope-Regular.ttf", "Manrope-Medium.ttf", "Manrope-SemiBold.ttf", "Manrope-Bold.ttf", "JetBrainsMono-Regular.ttf", "JetBrainsMono-Medium.ttf", "JetBrainsMono-Bold.ttf"]) {
		try {
			copyFileSync(path.join(src, f), path.join(FONT_DIR, f));
		} catch {
			console.warn(`⚠ font missing in ${src}: ${f}`);
		}
	}
	writeFileSync(
		FONT_CONF,
		`<?xml version="1.0"?>\n<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n<fontconfig>\n  <include>/etc/fonts/fonts.conf</include>\n  <dir>/usr/share/fonts</dir>\n  <dir>${FONT_DIR}</dir>\n  <cachedir>${path.join(FONT_HOME, ".cache/fontconfig")}</cachedir>\n</fontconfig>\n`,
	);
}

setupFontHome();

const VARIANTS = [
	{ theme: "light", file: "Nazariy-Petryk-Resume-Light.pdf" },
	{ theme: "dark", file: "Nazariy-Petryk-Resume-Dark.pdf" },
];

const browser = await chromium.launch({
	channel: "chromium",
	env: { ...process.env, HOME: FONT_HOME, FONTCONFIG_FILE: FONT_CONF },
});
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
		// Radix Avatar: ensure the real photo replaced the fallback before snapshot
		await page
			.waitForFunction(
				() => {
					const img = document.querySelector('[data-slot="avatar-image"]');
					return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
				},
				{ timeout: 15000 },
			)
			.catch(() => console.warn("⚠ avatar image did not confirm loading"));
		await page.waitForTimeout(500);
		// print pipeline drops webfonts unless every declared face is force-loaded
		await page.evaluate(() => Promise.all([...document.fonts].map((f) => f.load().catch(() => {}))));
		await page.evaluate(() => document.fonts.ready);
		// hide interactive controls + dev indicator; keep atomic blocks intact across page cuts
		await page.addStyleTag({
			content: `
				header{display:none!important}
				nextjs-portal{display:none!important}
				html{--font-manrope:"Manrope"!important;--font-jetbrains-mono:"JetBrains Mono"!important}
				*{transition:none!important;animation:none!important}
				[data-slot="card"]{break-inside:avoid}
				
				py-10,.py-10{padding-top:.4rem!important;padding-bottom:.4rem!important}
				h1{font-size:2.6rem!important;line-height:1!important}
				section h2{font-size:1.05rem!important;margin-bottom:.4rem!important}
				.my-6{margin-top:.8rem!important;margin-bottom:.8rem!important}
				space-y-5,.space-y-5>*,.space-y-6>*,.space-y-4>*,.space-y-3>*,.space-y-2>*{margin-top:.45rem!important}
				p{line-height:1.4!important;margin:0!important}
				.gap-6{gap:.8rem!important}
				.gap-2{gap:.35rem!important}
				.min-h-screen{min-height:0!important}
				.space-y-6>div,.space-y-4>div{break-inside:avoid}
				.flex.flex-wrap{break-inside:avoid}
				h2,h3{break-after:avoid}
				img,svg{break-inside:avoid}
			`,
		});
		const fontState = await page.evaluate(() => ({
			h1: getComputedStyle(document.querySelector("h1")).fontFamily.slice(0, 40),
			check: document.fonts.check("16px Manrope"),
			statuses: [...new Set([...document.fonts].map((f) => `${f.family}:${f.status}`))],
		}));
		console.log(`  fontState: ${JSON.stringify(fontState)}`);
		// strip webfont @font-face rules: the print renderer cannot use them and
		// they shadow same-named system fonts (which print CAN embed)
		await page.evaluate(() => {
			for (const sheet of document.styleSheets) {
				let rules;
				try {
					rules = [...sheet.cssRules];
				} catch {
					continue;
				}
				for (let i = rules.length - 1; i >= 0; i--) {
					if (rules[i] instanceof CSSFontFaceRule) {
						const fam = rules[i].style.getPropertyValue("font-family");
						if (/Manrope|JetBrains/i.test(fam)) sheet.deleteRule(i);
					}
				}
			}
		});
		// screen media keeps theme backgrounds; printBackground paints them
		await page.emulateMedia({ media: "screen" });
		await page.pdf({
			path: new URL(file, OUT_DIR).pathname,
			format: "A4",
			scale: 0.85,
			printBackground: true,
			margin: { top: "6mm", bottom: "6mm", left: "5mm", right: "5mm" },
		});
		await context.close();
		console.log(`✓ ${file} (${theme})`);
	}
} finally {
	await browser.close();
}
