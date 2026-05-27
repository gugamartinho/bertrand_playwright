import { Page, Locator, expect } from "@playwright/test";

export class BookPage {
  readonly page: Page;
  readonly authorLocator: Locator;
  readonly productDetails: Locator;
  readonly otherBooksByAuthor: Locator;
  readonly languageFlag: Locator;
  readonly addCartButton: Locator;
    
  constructor(page: Page) {
    this.page = page;
    this.authorLocator = page.locator('[id*="authors-h3"]');
    this.productDetails = page.locator('#product_detail .data');
    this.otherBooksByAuthor = page.locator('.product-portlet');
    this.languageFlag = page.locator('[id*=languageFlag]');
    this.addCartButton = page.locator('button[id*=addCart-btn]');
  }

  async checkAuthorIs(expectedAuthor: string) {
    await expect(this.authorLocator).toContainText(expectedAuthor);
  }

  async checkISBNIs(expectedISBN: string) {
    await expect(this.productDetails).toContainText(`ISBN: ${expectedISBN}`);
  }

  async checkPageCountIs(expectedPages: string) {
    await expect(this.productDetails).toContainText(`Páginas: ${expectedPages}`);
  }

  async checkDimensionsAre(expectedDimensions: string) {
    await expect(this.productDetails).toContainText(`Dimensões: ${expectedDimensions}`);
  }

  async checkOtherBookBySameAuthorExists(otherBookTitle: string) {
    await expect(this.otherBooksByAuthor.filter({ hasText: otherBookTitle })).toBeVisible();
  }

  async checkIdiomIs(expectedIdiom: string) {
    await expect(this.productDetails).toContainText(`Idioma: ${expectedIdiom}`);
  }

  async checkLanguageFlagIs(expectedLanguage: string) {
    const flagClass = await this.languageFlag.getAttribute('class');
    await expect(flagClass).toContain(expectedLanguage);
  }

  async addToCart() {
    await expect(this.addCartButton).toBeVisible({ timeout: 10000 });
    await expect(this.addCartButton).toBeEnabled({ timeout: 10000 });
    await this.addCartButton.click({ timeout: 10000 });
  }
}
