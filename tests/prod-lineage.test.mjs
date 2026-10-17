import { execSync } from "node:child_process";
import { test } from "node:test";
import assert from "node:assert/strict";

// Lineage guard: the deployed build must be a commit of THIS repository line.
// Exists because prod once ran a sha unreachable from any local ref
// (two divergent repos built the same domain). Run: PROD_BASE_URL=https://headsmanc0de.com npm run test:lineage

const BASE = process.env.PROD_BASE_URL;

test("prod health reports the built commit", { skip: !BASE && "set PROD_BASE_URL" }, async () => {
	const res = await fetch(`${BASE}/api/health`);
	assert.equal(res.status, 200);
	const body = await res.json();
	assert.match(String(body.commit ?? ""), /^[0-9a-f]{7,40}$/, `bad sha in health: ${JSON.stringify(body)}`);
});

test("deployed commit is an ancestor of local master (no split-brain)", { skip: !BASE && "set PROD_BASE_URL" }, async () => {
	const res = await fetch(`${BASE}/api/health`);
	const { commit } = await res.json();
	// throws (non-zero) when the prod sha is not reachable from HEAD
	execSync(`git merge-base --is-ancestor ${commit} HEAD`, { stdio: "pipe" });
});
