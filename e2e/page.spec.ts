import { test, expect } from '@playwright/test';

test('je vois le titre', async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole('heading', { name: 'Counter' })).toBeVisible();
});

test('connexion au wallet', async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Mock Connector" }).click();

	await expect(page.getByText("status: connected")).toBeVisible();
	await expect(page.getByText('addresses: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]')).toBeVisible();
});

test.describe('increment',()=>{
	test('fait les bons appels', async ({ page }) => {
		let callCount = 0;

		await page.route('https://rpc-amoy.polygon.technology/', async route => {
			callCount === 0 && expect(JSON.parse(<string>route.request().postData())).toMatchObject({
				method: "eth_call",
				params: [{
					//NOTE (16/06/2024): increment() encodé
					data: "0xd09de08a",
					from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
					to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
				}, "latest"],
			})
			callCount === 1 && expect(JSON.parse(<string>route.request().postData())).toMatchObject({
				method: "eth_sendTransaction",
				params: [{
					data: "0xd09de08a",
					from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
					to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
				}],
			});
			callCount++
			await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
		});

		await page.goto("/");
		await page.getByRole("button", { name: "Mock Connector" }).click();

		await page.getByRole("button", { name: "increment" }).click();
	});

	test('lorsqu‘il y a une erreur, affiche l‘erreur', async ({ page }) => {
		let callCount = 0;

		await page.route('https://rpc-amoy.polygon.technology/', async route => {
			callCount === 0 && await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			callCount === 1 && await route.fulfill({
				json: {
					error: { code: -32000, message: "unknown account" },
					id: 1,
					jsonrpc: "2.0",
				},
			});
			callCount++
		});

		await page.goto("/");
		await page.getByRole("button", { name: "Mock Connector" }).click();

		await page.getByRole("button", { name: "increment" }).click();

		await expect(page.getByText('Une erreur est apparu lors de l‘incrémentation:')).toBeVisible();
	});

	test('lorsque l‘appel est en succès, affiche un message de succès', async ({ page }) => {
		await page.route('https://rpc-amoy.polygon.technology/', async route => {
			await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
		});

		await page.goto("/");
		await page.getByRole("button", { name: "Mock Connector" }).click();

		await page.getByRole("button", { name: "increment" }).click();

		await expect(page.getByText('l‘incrementation a bien fonctionnée')).toBeVisible();
	});
})



