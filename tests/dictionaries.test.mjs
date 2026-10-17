import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

// SSOT contract for the only content source of the site: src/dictionaries/{uk,en}.json.
// These tests exist because the fleet shipped two divergent dictionary lines
// (GitHub master vs deploy line) and no gate could notice.

const load = (loc) =>
	JSON.parse(readFileSync(new URL(`../src/dictionaries/${loc}.json`, import.meta.url), "utf8"));

const uk = load("uk");
const en = load("en");
const SECTIONS = ["nav", "hero", "about", "skills", "projects", "experience", "education", "contacts"];

const groups = (d) => d.skills.groups;
const allItems = (d) => groups(d).flatMap((g) => g.items);

test("locales expose identical top-level sections", () => {
	assert.deepEqual(Object.keys(uk).sort(), Object.keys(en).sort());
	for (const s of SECTIONS) {
		assert.ok(uk[s], `uk.${s} missing`);
		assert.ok(en[s], `en.${s} missing`);
	}
});

test("skills: same group count and per-group item counts (i18n parity)", () => {
	assert.equal(groups(uk).length, groups(en).length);
	assert.deepEqual(groups(uk).map((g) => g.items.length), groups(en).map((g) => g.items.length));
});

test("skills: items are non-empty, trimmed, unique within a group", () => {
	for (const d of [uk, en]) {
		for (const g of groups(d)) {
			assert.ok(g.items.length > 0, `empty group: ${g.title}`);
			for (const item of g.items) {
				assert.equal(typeof item, "string");
				assert.ok(item.trim().length > 0, `empty item in ${g.title}`);
				assert.equal(item, item.trim(), `untrimmed item in ${g.title}: ${item}`);
			}
			assert.deepEqual(new Set(g.items).size, g.items.length, `duplicates in ${g.title}`);
		}
	}
});

test("skills: DRY — no item repeats across groups", () => {
	for (const [name, d] of [["uk", uk], ["en", en]]) {
		const seen = new Map();
		for (const g of groups(d)) {
			for (const item of g.items) {
				assert.ok(!seen.has(item), `${name}: "${item}" in both "${seen.get(item)}" and "${g.title}"`);
				seen.set(item, g.title);
			}
		}
	}
});

test("skills: group kinds are from the whitelist", () => {
	for (const d of [uk, en]) {
		for (const g of groups(d)) {
			assert.ok(g.kind === undefined || g.kind === "competency", `bad kind: ${g.title} -> ${g.kind}`);
		}
	}
});

test("skills: no stale learning markers on embedded group", () => {
	for (const [name, d] of [["uk", uk], ["en", en]]) {
		const emb = groups(d).find((g) => g.title.includes("Embedded"));
		assert.ok(emb, `${name}: embedded group missing`);
		assert.ok(!/вивчаю|Learning/i.test(emb.title), `${name}: group still marked as learning: ${emb.title}`);
		assert.equal(emb.kind, undefined, `${name}: kind=learning must not come back`);
	}
});

test("regression: embedded group lists the stack actually used at Moonrock", () => {
	for (const [name, d] of [["uk", uk], ["en", en]]) {
		const emb = groups(d).find((g) => g.title.includes("Embedded"));
		for (const must of ["ESP32", "Python", "Zig"]) {
			assert.ok(emb.items.includes(must), `${name}: embedded group lost "${must}"`);
		}
		assert.ok(emb.items.some((i) => i.startsWith("C/C++")), `${name}: C/C++ missing`);
	}
});

test("regression: Moonrock experience mentions the embedded work", () => {
	for (const d of [uk, en]) {
		const moonrock = d.experience.items.find((i) => /Moonrock/i.test(i.company));
		assert.ok(moonrock, "Moonrock entry missing");
		for (const must of ["ESP32", "Python", "Zig"]) {
			assert.ok(moonrock.description.includes(must), `Moonrock description lost "${must}"`);
		}
	}
});

test("experience: parity, fields, period format, unique companies", () => {
	assert.equal(uk.experience.items.length, en.experience.items.length);
	const seen = new Set();
	for (const [name, d] of [["uk", uk], ["en", en]]) {
		for (const item of d.experience.items) {
			for (const f of ["company", "position", "period", "description"]) {
				assert.ok(String(item[f] ?? "").trim(), `${name}: empty ${f} in ${item.company}`);
			}
			assert.match(item.period, /^.+\d{4} - .+$/, `${name}: bad period: ${item.period}`);
			if (name === "uk") {
				assert.ok(!seen.has(item.company), `duplicate company: ${item.company}`);
				seen.add(item.company);
			}
		}
	}
});

test("hero names present in both locales (print/resume identity)", () => {
	assert.match(JSON.stringify(en.hero), /Nazar/);
	assert.match(JSON.stringify(uk.hero), /Назар/);
});

test("no placeholder/debug markers anywhere in dictionaries", () => {
	for (const [name, d] of [["uk", uk], ["en", en]]) {
		const text = JSON.stringify(d);
		for (const bad of ["TODO", "FIXME", "XXX", "Lorem", "placeholder"]) {
			assert.ok(!text.includes(bad), `${name}: found "${bad}"`);
		}
	}
});
