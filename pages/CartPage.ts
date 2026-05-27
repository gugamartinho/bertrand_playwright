import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartBookTitle: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBookTitle = page.locator('span.titulo');
    this.emptyCartMessage = page.locator('.empty-info');
  }

  async checkCartItemTitle(title: string, index: number) {
    const itemTitle = this.cartBookTitle.nth(index);
    await expect(itemTitle).toContainText(title);
  }
  
  async removeItemFromCart(title: string, index = 0) {
    const removeButton = this.page.locator(`:has(span.titulo:has-text("${title}")) button.icon-trash`).nth(index);
    await expect(removeButton).toBeVisible();
    await removeButton.click();
  }

  async checkCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }
}
