import { expect, test } from "@playwright/test";

// Content regression specs. Born 2026-10-17: prod shipped without the
// embedded-at-Moonrock update because no functional check looked at content,
// only at "page renders 200".

test.describe("resume content (embedded at Moonrock)", () => {
	for (const locale of ["en", "uk"]) {
		test(`${locale}: Embedded & IoT group lists ESP32, Python, Zig`, async ({ page }) => {
			await page.goto(`/${locale}`);
			const body = page.locator("body");
			await expect(body).toContainText(/Embedded/i);
			await expect(body).toContainText("ESP32");
			// Python and Zig did not exist on prod before 2026-10-17 —
			// their presence is the deployment regression signal.
			await expect(body).toContainText("Python");
			await expect(body).toContainText("Zig");
		});

		test(`${locale}: contacts expose github profile link`, async ({ page }) => {
			await page.goto(`/${locale}`);
			await expect(page.locator("body")).toContainText("github.com/headsmanc0de");
		});
	}

	test("health endpoint reports the build commit", async ({ request }) => {
		const res = await request.get("/api/health");
		expect(res.status()).toBe(200);
		const body = await res.json();
		expect(body.commit).toBeTruthy();
	});

	test("deployed build matches the expected sha (deploy oracle)", async ({ request }) => {
		const expected = process.env.EXPECTED_SHA;
		test.skip(!expected, "EXPECTED_SHA is only set by scripts/deploy.mjs");
		const res = await request.get("/api/health");
		const body = await res.json();
		expect(body.commit).toBe(expected);
	});
});
