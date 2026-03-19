import { test, expect } from '@playwright/test';

test.describe('Search and Add to Cart E2E', () => {
  test('should search for a product and add it to cart', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByPlaceholder(/search/i); 
    await searchInput.fill('Smartphone');
    await page.getByRole('button', { name: /search/i }).click();
    
    await expect(page).toHaveURL(/.*search.*/);
    await expect(page.getByRole('heading', { name: /search results/i })).toBeVisible();
      
    // Find the product item more robustly - some layouts use cards without listitems
    const productItem = page.locator('.card').filter({ hasText: /smartphone/i }).first();
    await expect(productItem).toBeVisible();
    
    await productItem.getByRole('button', { name: /add to cart/i }).click();
    
    const cartCount = page.locator('.ant-badge-count');
    await expect(cartCount).toHaveText('1');
    
    const cartLink = page.getByRole('link', { name: /cart/i });
    await cartLink.click();
    await expect(page).toHaveURL(/.*cart.*/);
    
    await expect(page.getByRole('main')).toContainText(/smartphone/i);
  });
});