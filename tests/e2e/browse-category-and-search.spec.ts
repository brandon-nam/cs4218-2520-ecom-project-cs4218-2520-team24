// spec: specs/navigation-search-flow.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home → Category → Product → Search', () => {
  test('Browse category, open product, then search for another item', async ({ page }) => {
    // Navigate to the Home page for the scenario.
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    // Open the Categories dropdown and navigate to All Categories.
    await page.getByRole('link', { name: 'Categories' }).click();

    // Click All Categories to navigate to /categories.
    await page.getByRole('link', { name: 'All Categories' }).click();
    await expect(page).toHaveURL(/\/categories/);
    await expect(page.getByRole('link', { name: 'Electronics' })).toBeVisible();

    // Click a category (Electronics) to view its products.
    await page.getByRole('link', { name: 'Electronics' }).click();
    await expect(page).toHaveURL(/\/category\//);
    await expect(page.getByRole('heading', { name: /Category -/ })).toBeVisible();

    // Click the first product's 'More Details' button to open the product detail page.
    await page.getByRole('button', { name: 'More Details' }).first().click();
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByRole('heading', { name: 'Product Details' })).toBeVisible();

    // Type a different product keyword into the global search bar.
    await page.getByRole('searchbox', { name: 'Search' }).fill('Smartphone');

    // Submit the global search form to navigate to the search results page.
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page).toHaveURL(/\/search/);
    await expect(page.getByRole('heading', { name: 'Search Resuts' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'More Details' })).toBeVisible();
  });
});
