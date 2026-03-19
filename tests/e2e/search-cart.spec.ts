import { test, expect } from '@playwright/test';

test.describe('Search and Add to Cart E2E', () => {
  test('should search for a product and add it to cart', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByPlaceholder(/search/i); 
    await searchInput.fill('Smartphone');
    await page.getByRole('button', { name: /search/i }).click();
    
    await expect(page).toHaveURL(/.*search.*/);
    await expect(page.getByRole('heading', { name: /search results/i })).toBeVisible();
      
    const productItem = page.getByRole('listitem').filter({ hasText: /smartphone/i });
    await expect(productItem).toBeVisible();
    
    await productItem.getByRole('button', { name: /add to cart/i }).click();
    
    const cartLink = page.getByRole('link', { name: /cart/i });
    await expect(cartLink).toContainText('1');
    
    await cartLink.click();
    await expect(page).toHaveURL(/.*cart.*/);
    
    await expect(page.getByRole('main')).toContainText(/smartphone/i);
  });
});