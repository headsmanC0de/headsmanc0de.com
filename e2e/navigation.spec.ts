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

	test("static files bypass proxy (icon.svg returns 200)", async ({ page }) => {
		const response = await page.goto("/icon.svg");
		expect(response?.status()).toBe(200);
		expect(response?.headers()["content-type"]).toContain("image/svg");
	});

	for (const file of [
		"Nazariy-Petryk-Resume-Light.pdf",
		"Nazariy-Petryk-Resume-Dark.pdf",
	]) {
		test(`resume PDF is served (${file})`, async ({ request }) => {
			const response = await request.get(`/resume/${file}`);
			expect(response.status()).toBe(200);
			expect(response.headers()["content-type"]).toContain("application/pdf");
		});
	}

	test("resume download button opens theme menu", async ({ page }) => {
		await page.goto("/en");
		await page.getByRole("button", { name: "Download resume PDF" }).click();
		await expect(page.getByRole("menuitem", { name: "Light theme" })).toBeVisible();
		await expect(page.getByRole("menuitem", { name: "Dark theme" })).toBeVisible();
	});
});
