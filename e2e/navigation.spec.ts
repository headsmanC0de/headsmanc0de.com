import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
	test("/en page loads successfully (200)", async ({ page }) => {
		const response = await page.goto("/en");
		expect(response?.status()).toBe(200);
	});

	test("/uk page loads successfully (200)", async ({ page }) => {
		const response = await page.goto("/uk");
		expect(response?.status()).toBe(200);
	});

	test("static files bypass proxy (favicon.ico returns 200)", async ({ page }) => {
		const response = await page.goto("/favicon.ico");
		expect(response?.status()).toBe(200);
	});
});
