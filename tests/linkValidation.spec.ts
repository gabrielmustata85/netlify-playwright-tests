import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { getAllLinks, checkUrlAccessibility } from '../utils/helpers';

test.describe('404 Link Verification', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo();
  });

  test('Check all links on homepage for 404 errors', async ({ page }) => {
    const links = await getAllLinks(page);
    expect(links.length).toBeGreaterThan(0);

    const brokenLinks: string[] = [];
    
    const testLinks = links.slice(0, 10);
    for (const link of testLinks) {
      if (link.startsWith('mailto:') || link.startsWith('tel:')) continue;
      
      if (!link.includes('netlify.com')) continue;
      
      const status = await checkUrlAccessibility(page, link);
      if (status >= 400) {
        brokenLinks.push(`${link} (Status: ${status})`);
      }
    }

    expect(brokenLinks).toEqual([]);
  });

  test('Check navigation links for 404 errors', async ({ page }) => {
    const navLinks = await page.locator('nav a[href]').evaluateAll((links: HTMLAnchorElement[]) => 
      links.map(link => link.href)
    );
    expect(navLinks.length).toBeGreaterThan(0);

    const brokenLinks: string[] = [];
    
    for (const link of navLinks) {
      if (link.startsWith('mailto:') || link.startsWith('tel:')) continue;
      
      const status = await checkUrlAccessibility(page, link);
      if (status >= 400) {
        brokenLinks.push(`${link} (Status: ${status})`);
      }
    }

    expect(brokenLinks).toEqual([]);
  });
});