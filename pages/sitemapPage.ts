import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class SitemapPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getSitemapUrls(): Promise<string[]> {
    const response = await this.page.request.get('/sitemap.xml');
    expect(response.status()).toBe(200);

    const sitemapContent = await response.text();
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);

    if (!urlMatches) {
      return [];
    }

    return urlMatches.map(url => {
      return url.replace(/<\/?loc>/g, '').trim();
    });
  }
}
