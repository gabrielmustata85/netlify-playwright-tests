import { test, expect } from '@playwright/test';
import { SitemapPage } from '../pages/sitemapPage';
import { checkForNoIndex } from '../utils/helpers';

test.describe('Sitemap and Crawlability Verification', () => {
    let sitemapPage: SitemapPage;
    const importantPages = ['/', '/pricing/', '/blog/', '/docs/'];

    test.beforeEach(async ({ page }) => {
        sitemapPage = new SitemapPage(page);
    });

    test('Verify sitemap.xml exists and is accessible', async () => {
        await sitemapPage.navigateTo('/sitemap.xml');
        const urls = await sitemapPage.getSitemapUrls();
        expect(urls.length).toBeGreaterThan(0);
    });

    test('Check URLs in sitemap are accessible', async ({ page }) => {
        const urls = await sitemapPage.getSitemapUrls();
        expect(urls.length).toBeGreaterThan(0);

        // Check first 5 URLs
        const testUrls = urls.slice(0, 5);
        for (const url of testUrls) {
            const status = await page.request.get(url).then(r => r.status());
            expect(status).toBe(200);
        }
    });

    test('Important pages should not have noindex meta tag', async ({ page }) => {
        for (const path of importantPages) {
            await sitemapPage.navigateTo(path);

            await page.waitForLoadState('domcontentloaded');

            const metaLocator = page.locator('meta[name="robots"]');
            const metaExists = await metaLocator.count() > 0;

            if (!metaExists) {
                continue;
            }

            const metaRobots = await metaLocator.getAttribute('content');
            expect(metaRobots).not.toContain('noindex');
        }
    });

    test('Important pages should be crawlable', async ({ page }) => {
        for (const path of importantPages) {
            await sitemapPage.navigateTo(path);

            const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);
            expect(canonical, `Canonical link missing on ${path}`).toBeTruthy();

            const response = await page.request.get(path);
            const headers = response.headers();

            const xRobotsTag = headers['x-robots-tag'];
            if (xRobotsTag) {
                expect(xRobotsTag, `x-robots-tag contains 'noindex' on ${path}`).not.toContain('noindex');
            }
        }
    });
});