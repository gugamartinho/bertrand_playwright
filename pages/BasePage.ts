import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly badgeShoppingCart: Locator;
    
  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('button#cart-button');
    this.badgeShoppingCart = page.locator('#badge-shoppingCart');
    
  }

  async openCart() {
    await this.cartButton.click();
  }

  async checkCartItemCount(expectedCount: number) {
    await expect(this.badgeShoppingCart).toHaveText(expectedCount.toString());
  }

  async waitForBadgeToBeVisible() {
    await expect(this.badgeShoppingCart).toBeVisible({ timeout: 10000 });
  }

  async waitForBadgeToBeNotVisible() {
    await expect(this.badgeShoppingCart).toBeHidden({ timeout: 10000 });
  }

}