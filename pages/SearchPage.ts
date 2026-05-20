import { Page, Locator, expect } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly resultsList: Locator;
    
  constructor(page: Page) {
    this.page = page;
    this.resultsList = page.locator('.product-portlet');
  }

  async openFirstResultWithTitle(title: string) {
    const result = this.resultsList.filter({ hasText: title }).first();
    const link = result.locator('a.track, a').first();
    await link.click();
  }
}
