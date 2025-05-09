import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Lead Capture Form Validation', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo();
  });

  test('Verify newsletter form is present', async () => {
    await homePage.isNewsletterFormVisible();
  });

  test('Submit form with valid email', async ({ page }) => {
    await homePage.submitNewsletterForm('test@example.com');
    
    await expect(homePage.emailInput).toHaveValue('test@example.com');
    await expect(homePage.submitButton).toBeEnabled();
  });

  test('Submit form with invalid email', async () => {
    await homePage.submitNewsletterForm('invalid-email');
    
    await expect(homePage.emailInput).toHaveValue('invalid-email');
    await expect(homePage.submitButton).toBeEnabled();
  });

  test('Submit empty form', async () => {
    await homePage.clickElement(homePage.submitButton);
    
    await expect(homePage.emailInput).toHaveAttribute('required', '');
    await expect(homePage.emailInput).toHaveClass(/invalid/);
  });
});