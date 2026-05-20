import { Page, Locator, expect } from "@playwright/test";

export class BookPage {
  readonly page: Page;
  readonly resultsList: Locator;
  readonly authorLocator: Locator;
  readonly productDetails: Locator;
    
  constructor(page: Page) {
    this.page = page;
    this.resultsList = page.locator('.product-portlet');
    this.authorLocator = page.locator('h3#productPageRightSectionTop-authors-h3');
    this.productDetails = page.locator('#product_detail .data');
  }

  async openFirstResultWithTitle(title: string) {
    const result = this.resultsList.filter({ hasText: title }).first();
    const link = result.locator('a.track, a').first().click();
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
}
