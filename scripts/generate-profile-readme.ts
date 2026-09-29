/**
 * GitHub profile README generator — SSOT is the site dictionary.
 *
 * Renders headsmanC0de/headsmanC0de README.md 1:1 from the same content
 * the portfolio site renders (src/dictionaries/en.json + experience utils).
 *
 * Usage:
 *   bun scripts/generate-profile-readme.ts            # write profile/README.md (review)
 *   bun scripts/generate-profile-readme.ts --publish  # + push to GitHub via gh CLI
 */
import { mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { formatProfessionalExperience } from "../src/lib/professional-experience";
import dict from "../src/dictionaries/en.json";

const PROFILE_REPO = "headsmanC0de/headsmanC0de";
const OUT_PATH = new URL("../profile/README.md", import.meta.url).pathname;

/** skill → simple-icons slug (empty = badge without logo) */
const LOGOS: Record<string, string> = {
	TypeScript: "typescript",
	JavaScript: "javascript",
	React: "react",
	"Next.js": "nextdotjs",
	"Tailwind CSS": "tailwindcss",
	"Radix UI / shadcn": "shadcnui",
	"Redux Toolkit": "redux",
	"Material UI": "mui",
	SCSS: "sass",
	Bun: "bun",
	"Node.js": "nodedotjs",
	NestJS: "nestjs",
	Hono: "hono",
	PostgreSQL: "postgresql",
	"Drizzle ORM": "drizzle",
	Prisma: "prisma",
	"Valkey / Redis": "redis",
	RabbitMQ: "rabbitmq",
	Zod: "zod",
	Tauri: "tauri",
	Rust: "rust",
	"Expo / React Native": "expo",
	Turborepo: "turborepo",
	Playwright: "playwright",
	Vitest: "vitest",
	"Linux Administration": "linux",
	"Proxmox VE": "proxmox",
	Docker: "docker",
	Nginx: "nginx",
	Prometheus: "prometheus",
	Grafana: "grafana",
	OpenTelemetry: "opentelemetry",
	PostHog: "posthog",
	n8n: "n8n",
	"Ollama / LM Studio": "ollama",
	Codex: "openai",
	"Claude Code": "claude",
	"Gemini CLI": "googlegemini",
	Resend: "resend",
	ESP32: "espressif",
	"C/C++ (Embedded)": "c",
};

const CONTACT_URLS: Record<string, (v: string) => string> = {
	email: (v) => `mailto:${v}`,
	telegram: (v) => `https://t.me/${v.replace("@", "")}`,
	linkedin: (v) => `https://${v.replace(/^https?:\/\//, "")}`,
	github: (v) => `https://${v.replace(/^https?:\/\//, "")}`,
	website: (v) => `https://${v.replace(/^https?:\/\//, "")}`,
};

const escape = (s: string) => encodeURIComponent(s.replaceAll("-", "--")).replaceAll("%20", "%20");
const badge = (label: string, logo?: string) =>
	`<img alt="${label}" src="https://img.shields.io/badge/${escape(label)}-181717.svg?style=flat-square${logo ? `&logo=${logo}&logoColor=white` : ""}" />`;

function render(): string {
	const d = dict as typeof import("../src/dictionaries/en.json");
	const L: string[] = [];

	L.push(
		"<!-- ⚠️ GENERATED FILE — do not edit manually.",
		"    SSOT: src/dictionaries/en.json in headsmanc0de.com repo.",
		"    Regenerate: bun run readme:generate / readme:publish -->",
		"",
		`### 👋 Hi, I'm ${d.hero.name}`,
		"",
		`**${d.hero.title}** · ${d.hero.subtitle.split(" · ").slice(0, -1).join(" · ")}`,
		"",
		`\`${formatProfessionalExperience("en")} ${d.hero.experienceLabel}\``,
		"",
	);
	// contact badges
	const badgeLogos: Record<string, string> = { telegram: "telegram", linkedin: "linkedin", github: "github" };
	const badgeContacts = d.contacts.items.filter((c) => c.type in CONTACT_URLS);
	L.push(
		"<p align=\"center\">",
		...badgeContacts.map((c) => {
			const label = c.type.charAt(0).toUpperCase() + c.type.slice(1);
			const url = CONTACT_URLS[c.type](c.value);
			return `<a href="${url}" target="_blank">${badge(label, badgeLogos[c.type])}</a>`;
		}),
		"</p>",
		"",
		"---",
		"",
		`## 🧭 ${d.about.title}`,
		"",
		d.about.description,
		"",
		`## 🛠 ${d.skills.title}`,
		"",
	);
	for (const group of d.skills.groups) {
		const learning = group.kind === "learning";
		L.push(`### ${group.title}${learning ? " 🌱" : ""}`, "");
		L.push("<p>");
		for (const skill of group.items) L.push(`  <a href="#">${badge(skill, LOGOS[skill])}</a>`);
		L.push("</p>", "");
	}
	L.push(`## 🚀 ${d.projects.title}`, "", d.projects.intro, "");
	for (const p of d.projects.items) {
		L.push(`### [${p.name}](${p.url})`, "", `*${p.type}*`, "", p.description, "", `**Stack:** ${p.stack.join(" · ")}`, "");
	}
	L.push(`## 💼 ${d.experience.title}`, "");
	for (const e of d.experience.items) {
		L.push(`### ${e.position} — ${e.company}`, "", `\`${e.period}\``, "", e.description, "");
	}
	L.push(`## 🎓 ${d.education.title}`, "");
	for (const ed of d.education.items) {
		L.push(`- **${ed.institution}** — ${ed.degree}${ed.period ? ` \`${ed.period}\`` : ""}`);
	}
	L.push("", `## 📫 ${d.contacts.title}`, "");
	for (const c of d.contacts.items) {
		const label = c.type.charAt(0).toUpperCase() + c.type.slice(1);
		const makeUrl = CONTACT_URLS[c.type];
		const value = makeUrl ? `[${c.value}](${makeUrl(c.value)})` : c.value;
		L.push(`- **${label}:** ${value}`);
	}
	L.push("");
	return L.join("\n");
}

async function publish(markdown: string) {
	const shaRes = spawnSync(
		"gh",
		["api", `repos/${PROFILE_REPO}/contents/README.md`, "--jq", ".sha"],
		{ encoding: "utf8" },
	);
	const sha = shaRes.stdout?.trim();
	if (!sha) {
		console.error("Failed to fetch current README sha:", shaRes.stderr);
		process.exit(1);
	}
	const content = Buffer.from(markdown).toString("base64");
	const put = spawnSync(
		"gh",
		[
			"api", "--method", "PUT", `repos/${PROFILE_REPO}/contents/README.md`,
			"-f", "message=sync: regenerate profile README from portfolio SSOT",
			"-f", `content=${content}`,
			"-f", `sha=${sha}`,
		],
		{ encoding: "utf8" },
	);
	if (put.status !== 0) {
		console.error("Publish failed:", put.stderr);
		process.exit(1);
	}
	console.log(`✓ published to github.com/${PROFILE_REPO}`);
}

const markdown = render();

if (process.argv.includes("--publish")) {
	await publish(markdown);
}
await mkdir(new URL("../profile/", import.meta.url), { recursive: true });
await writeFile(OUT_PATH, markdown);
console.log(`✓ written ${OUT_PATH}`);
