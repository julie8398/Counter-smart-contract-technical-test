import { expect, test } from '@playwright/test';

const polygonAmoyUrl = 'https://rpc-amoy.polygon.technology/';


test.describe('Compteur', () => {
	test('je vois le titre', async ({ page }) => {
		await page.goto("/");
		await expect(page.getByRole('heading', { name: 'Counter' })).toBeVisible();
	});

	test.describe('compteur', () => {
		test('je vois la valeur du compteur', async ({ page }) => {
			const encodageNumber2 = '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002'
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({
					json: { jsonrpc: "2.0", id: 0, result: encodageNumber2 },
				});
			});

			await page.goto("/");

			await expect(page.getByRole('heading', { name: 'Valeur du compteur : 2' })).toBeVisible();
		});

		test('je peux lancer une mise à jour du compteur', async ({ page }) => {
			const encodageNumber2 = '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002'
			const encodageNumber4 = '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004'
			let count = 0
			await page.route(polygonAmoyUrl, async route => {
				count === 0 && await route.fulfill({
					json: { jsonrpc: "2.0", id: 0, result: encodageNumber2 },
				});
				count === 1 && await route.fulfill({
					json: { jsonrpc: "2.0", id: 0, result: encodageNumber4 },
				});
				count++
			});

			await page.goto("/");
			await expect(page.getByRole('heading', { name: 'Valeur du compteur : 2' })).toBeVisible();

			await page.getByRole('button', { name: 'Mise à jour' }).click();

			await expect(page.getByRole('heading', { name: 'Valeur du compteur : 4' })).toBeVisible();
		});
	})


	test('connexion au wallet', async ({ page }) => {
		await page.goto("/");
		await page.getByRole("button", { name: "Mock Connector" }).click();

		await expect(page.getByText("Etat de la connexion: connecté")).toBeVisible();
	});

	test.describe('increment', () => {
		test('fait les bons appels', async ({ page }) => {
			let callCount = 0;
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.route(polygonAmoyUrl, async route => {
				const payload = JSON.parse(<string>route.request().postData());

				callCount === 1 && expect(payload).toMatchObject({
					method: "eth_call",
					params: [{
						data: expect.any(String),
						from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					}, "latest"],
				})
				callCount === 2 && expect(payload).toMatchObject({
					method: "eth_sendTransaction",
					params: [{
						data: expect.any(String),
						from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					}],
				});
				await page.getByRole("button", { name: "increment" }).click();
			});
		});

		test('lorsqu‘il y a une erreur, affiche l‘erreur', async ({ page }) => {
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({
					json: {
						error: { code: -32000, message: "unknown account" },
						id: 1,
						jsonrpc: "2.0",
					},
				});
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("button", { name: "increment" }).click();

			await expect(page.getByText('Une erreur est apparu lors de l‘incrémentation:')).toBeVisible();
		});

		test('lorsque l‘appel est en succès, affiche un message de succès', async ({ page }) => {
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("button", { name: "increment" }).click();

			await expect(page.getByText('L‘incrementation a bien fonctionnée')).toBeVisible();
		});
	});

	test.describe('decrement', () => {
		test('fait les bons appels', async ({ page }) => {
			let callCount = 0;
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.route(polygonAmoyUrl, async route => {
				const payload = JSON.parse(<string>route.request().postData());
				callCount === 1 && expect(payload).toMatchObject({
					method: "eth_call",
					params: [expect.objectContaining({
						data: expect.any(String),
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					}), "latest"],
				})
				callCount === 2 && expect(payload).toMatchObject({
					method: "eth_sendTransaction",
					params: [expect.objectContaining({
						data: expect.any(String),
						from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					})],
				});
				callCount++
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});
			await page.getByRole("button", { name: "Decrement" }).click();
		});

		test('lorsqu‘il y a une erreur, affiche l‘erreur', async ({ page }) => {
			let callCount = 0;

			await page.route(polygonAmoyUrl, async route => {
				callCount === 1 && await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
				callCount === 2 && await route.fulfill({
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

			await page.getByRole("button", { name: "Decrement" }).click();

			await expect(page.getByText('Une erreur est apparu lors de la décrémentation:')).toBeVisible();
		});

		test('lorsque l‘appel est en succès, affiche un message de succès', async ({ page }) => {
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("button", { name: "Decrement" }).click();

			await expect(page.getByText('la décrémentation a bien fonctionnée')).toBeVisible();
		});
	})

	test.describe('incrementBy', () => {
		test('fait les bons appels', async ({ page }) => {
			let callCount = 0;
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("spinbutton", { name: "Nombre a incrémenter:" }).fill('4');

			await page.route(polygonAmoyUrl, async route => {
				const payload = JSON.parse(<string>route.request().postData());

				callCount === 0 && expect(payload).toMatchObject({
					method: "eth_call",
					params: [expect.objectContaining({
						data: expect.any(String),
						from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					}), "latest"],
				})
				callCount === 1 && expect(payload).toMatchObject({
					method: "eth_sendTransaction",
					params: [expect.objectContaining({
						data: expect.any(String),
						from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					})],
				});
				callCount++
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.getByRole("button", { name: "Incrémenter de" }).click();

			await expect(page.getByText('l‘incrementation a bien fonctionnée')).toBeVisible();
		});

		test('lorsqu‘il y a une erreur, affiche l‘erreur', async ({ page }) => {
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({
					json: {
						error: { code: -32000, message: "unknown account" },
						id: 1,
						jsonrpc: "2.0",
					},
				});
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("spinbutton", { name: "Nombre a incrémenter:" }).fill('4');
			await page.getByRole("button", { name: "Incrémenter de" }).click();

			await expect(page.getByText('Une erreur est apparu lors de l‘incrémentation:')).toBeVisible();
		});

		test('lorsque l‘appel est en succès, affiche un message de succès', async ({ page }) => {
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("spinbutton", { name: "Nombre a incrémenter:" }).fill('4');
			await page.getByRole("button", { name: "Incrémenter de" }).click();

			await expect(page.getByText('l‘incrementation a bien fonctionnée')).toBeVisible();
		});
	})

	test.describe('decrementBy', () => {
		test('fait les bons appels', async ({ page }) => {
			let callCount = 0;

			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.route(polygonAmoyUrl, async route => {
				const payload = JSON.parse(<string>route.request().postData());

				callCount === 1 && expect(payload).toMatchObject({
					method: "eth_call",
					params: [expect.objectContaining({
						data: expect.any(String),
						from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					}), "latest"],
				})
				callCount === 2 && expect(payload).toMatchObject({
					method: "eth_sendTransaction",
					params: [expect.objectContaining({
						data: expect.any(String),
						from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						to: "0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3",
					})],
				});
				callCount++
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});
			await page.getByRole("spinbutton", { name: "Nombre a décrémenter:" }).fill('4');
			await page.getByRole("button", { name: "Décrémenter de" }).click();
		});

		test('lorsqu‘il y a une erreur, affiche l‘erreur', async ({ page }) => {
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({
					json: {
						error: { code: -32000, message: "unknown account" },
						id: 1,
						jsonrpc: "2.0",
					},
				});
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("spinbutton", { name: "Nombre a décrémenter:" }).fill('4');
			await page.getByRole("button", { name: "Décrémenter de" }).click();

			await expect(page.getByText('Une erreur est apparu lors de la décrémentation:')).toBeVisible();
		});

		test('lorsque l‘appel est en succès, affiche un message de succès', async ({ page }) => {
			await page.route(polygonAmoyUrl, async route => {
				await route.fulfill({ json: { jsonrpc: "2.0", id: 0, result: "0x" } });
			});

			await page.goto("/");
			await page.getByRole("button", { name: "Mock Connector" }).click();

			await page.getByRole("spinbutton", { name: "Nombre a décrémenter:" }).fill('4');
			await page.getByRole("button", { name: "Décrémenter de" }).click();

			await expect(page.getByText('la décrémentation a bien fonctionnée')).toBeVisible();
		});
	});
})
