import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[name="email"]');
    this.submitButton = page.locator('input[value="Subscribe"]');
    this.successMessage = page.locator('.success-message');
    this.errorMessage = page.locator('.error-message');
  }

  async scrollToNewsletterForm() {
    await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    }

  async isNewsletterFormVisible() {
    await expect(this.emailInput).toBeVisible();
  }

  async submitNewsletterForm(email: string) {
    await this.fillInput(this.emailInput, email);
    await this.clickElement(this.submitButton);
  }
}