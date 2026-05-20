import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly badgeShoppingCart: Locator;
  readonly cartBookTitle: Locator;
  readonly cartButton: Locator;
  readonly removeItemButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.badgeShoppingCart = page.locator('#badge-shoppingCart');
    this.cartBookTitle = page.locator('span.titulo').first();
    this.cartButton = page.locator('button#cart-button');
    this.removeItemButton = page.locator('button.icon-trash').first();
    this.emptyCartMessage = page.locator('.empty-info');
  }

  async waitForBadgeToBeVisible() {
    await expect(this.badgeShoppingCart).toBeVisible({ timeout: 10000 });
  }

  async waitForBadgeToBeNotVisible() {
    await expect(this.badgeShoppingCart).toBeHidden({ timeout: 10000 });
  }

  async openCart() {
    await this.cartButton.click();
  }

  async checkCartItemCount(expectedCount: number) {
    await expect(this.badgeShoppingCart).toHaveText(expectedCount.toString());
  }

  async checkCartItemTitle(expectedTitle: string) {
    await expect(this.cartBookTitle).toContainText(expectedTitle);
  }

  async removeItemFromCart() {
    await this.removeItemButton.click();
  }

  async checkCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }
}
