import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
    
  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="palavra"]');
    this.searchButton = page.locator('button[type="submit"][aria-label="pesquisar"]');
  }

  async acceptCookiesIfVisible() {
    const acceptButton = this.page.getByRole('button', { name: 'Aceitar' });
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }
}
