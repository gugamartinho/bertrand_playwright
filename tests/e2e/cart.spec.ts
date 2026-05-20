import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SearchPage } from "../../pages/SearchPage";
import { BookPage } from "../../pages/BookPage";
import { CartPage } from "../../pages/CartPage";
import { acceptCookiesIfVisible } from "../../utils/cookies";

let homePage: HomePage;
let searchPage: SearchPage;
let bookPage: BookPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    bookPage = new BookPage(page);
    cartPage = new CartPage(page);
    await acceptCookiesIfVisible(page);
});

test('Scenario 4 - Add 1984 to cart and validate cart has one correct book', async ({ page }) => {
    await homePage.searchFor('1984');
    await searchPage.openFirstResultWithTitle('1984');
    await bookPage.addToCart();
    await cartPage.waitForBadgeToBeVisible();
    await cartPage.checkCartItemCount(1);
    await cartPage.openCart();
    await cartPage.checkCartItemTitle('1984');
});

test('Scenario 4 - Remove 1984 from cart and validate cart is empty', async ({ page }) => {
    await homePage.searchFor('1984');
    await searchPage.openFirstResultWithTitle('1984');
    await bookPage.addToCart();
    await cartPage.waitForBadgeToBeVisible();
    await cartPage.checkCartItemCount(1);
    await cartPage.openCart();
    await cartPage.checkCartItemTitle('1984');
    await cartPage.removeItemFromCart();
    await cartPage.checkCartIsEmpty();
    await cartPage.waitForBadgeToBeNotVisible();
});