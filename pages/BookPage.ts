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
    this.authorLocator = page.locator('h3#productPageRightSectionTop-authors-h3');
    this.productDetails = page.locator('#product_detail .data');
    this.otherBooksByAuthor = page.locator('.product-portlet');
    this.languageFlag = page.locator('#productPageRightSectionTop-languageFlag');
    this.addCartButton = page.locator('button#productPageRightSectionTop-actions-addCart-btn');
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
    await this.addCartButton.click();
  }
}
