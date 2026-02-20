import { expect, test } from "@playwright/test";

test.describe("i18n", () => {
	test("root redirects to /en (default locale)", async ({ page }) => {
		await page.goto("/");
		// Playwright follows redirects automatically
		expect(page.url()).toContain("/en");
	});

	test("/en shows 'Nazar Petryk'", async ({ page }) => {
		await page.goto("/en");
		await expect(page.locator("body")).toContainText("Nazar Petryk");
	});

	test("/uk shows 'Назарій Петрик'", async ({ page }) => {
		await page.goto("/uk");
		await expect(page.locator("body")).toContainText("Назарій Петрик");
	});

	test("invalid locale /de returns 404", async ({ page }) => {
		const response = await page.goto("/de");
		expect(response?.status()).toBe(404);
	});
});
