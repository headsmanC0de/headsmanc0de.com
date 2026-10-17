/**
 * One-command portfolio deploy — executable form of docs/deploy.md (manual path).
 * SSOT split: procedure lives here; serving-chain coordinates live in
 * ~/projects/infra/docs/topology.md; secrets never live here (ssh key auth).
 *
 * Usage: bun scripts/deploy.mjs [--skip-e2e]
 * Requires: clean git tree, docker, ssh access to the Dokploy host.
 */
import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const HOST = process.env.DEPLOY_HOST ?? "vps-1.tail83505e.ts.net";
const PROJECT = "portfolio-production-wqvsbf";
const COMPOSE_DIR = `/etc/dokploy/compose/${PROJECT}/code`;
const CONTAINER = `${PROJECT}-web-1`;
const SMOKE_PORT = 3311;

const sh = (cmd, opts = {}) => {
	const r = spawnSync(cmd, { shell: true, encoding: "utf8", stdio: opts.quiet ? undefined : "inherit" });
	if (r.status !== 0) {
		console.error(`✗ step failed: ${cmd}\n${r.stderr ?? ""}`);
		process.exit(1);
	}
	return r;
};

const sha = sh("git rev-parse --short HEAD", { quiet: true }).stdout.trim();
const dirty = sh("git status --porcelain", { quiet: true }).stdout.trim();
if (dirty) {
	console.error("✗ working tree is dirty — commit first (prod tag must equal HEAD)");
	process.exit(1);
}
console.log(`▶ deploy ${sha} → ${HOST}`);

// 1. static gates
sh("bun run lint && bun run typecheck");

// 2. build + smoke
sh(`docker build --build-arg GIT_SHA=${sha} -t portfolio:${sha} .`);
sh(`docker run -d --rm --name portfolio-smoke -p ${SMOKE_PORT}:3000 portfolio:${sha}`);
sh(`sleep 4 && curl -sf http://localhost:${SMOKE_PORT}/api/health | grep -q '"commit":"${sha}"'`);
sh(`curl -sf http://localhost:${SMOKE_PORT}/en | grep -q "Nazariy Petryk"`);
sh(`curl -sf http://localhost:${SMOKE_PORT}/resume/Nazariy-Petryk-Resume-Light.pdf -o /dev/null`);
sh("docker stop portfolio-smoke");

// 3. transfer + swap (record rollback digest)
sh(`docker save portfolio:${sha} | ssh ${HOST} docker load`);
sh(
	`ssh ${HOST} "cd ${COMPOSE_DIR} && cp docker-compose.yml docker-compose.yml.bak && ` +
		`docker inspect ${CONTAINER} --format '{{.Image}}' > .rollback-digest && ` +
		`sed -i 's|image: .*|image: portfolio:${sha}|' docker-compose.yml && grep image: docker-compose.yml"`,
);

// 4. restart + verify direct
sh(`ssh ${HOST} "cd ${COMPOSE_DIR} && docker compose -p ${PROJECT} up -d && sleep 3 && curl -sf http://127.0.0.1:3300/api/health | grep -q ${sha}"`);
console.log(`✓ direct verify ok (rollback digest in ${COMPOSE_DIR}/.rollback-digest on ${HOST})`);

// 5. wait until the edge serves this exact build (tunnel reconnect latency)
if (!process.argv.includes("--skip-e2e")) {
	const deadline = Date.now() + 60_000;
	for (;;) {
		try {
			const r = await fetch(`https://headsmanc0de.com/api/health`);
			if (r.ok && (await r.json()).commit === sha) break;
		} catch {}
		if (Date.now() > deadline) {
			console.error(`\u2717 edge not serving ${sha} within 60s`);
			process.exit(1);
		}
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
	console.log(`\u2713 edge serves ${sha}`);
}

// 6. prod e2e through the edge
if (!process.argv.includes("--skip-e2e")) {
	sh(`BASE_URL=https://headsmanc0de.com EXPECTED_SHA=${sha} bun run test:e2e`);
}
console.log(`✓ deployed ${sha}`);
