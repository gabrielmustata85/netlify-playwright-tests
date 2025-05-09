import { Page } from '@playwright/test';

export async function checkForNoIndex(page: Page): Promise<boolean> {
  const metaRobots = await page.locator('meta[name="robots"]').getAttribute('content');
  return metaRobots?.includes('noindex') ?? false;
}

export async function getAllLinks(page: Page): Promise<string[]> {
  return await page.locator('a[href]').evaluateAll((links: HTMLAnchorElement[]) => 
    links.map(link => link.href)
  );
}

export async function checkUrlAccessibility(page: Page, url: string): Promise<number> {
  try {
    const response = await page.request.get(url);
    return response.status();
  } catch (error) {
    return 500;
  }
}