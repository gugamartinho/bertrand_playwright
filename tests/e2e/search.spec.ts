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

test('Scenario 1 - Search 1984 Book and check details', async ({ page }) => {
    await homePage.searchFor('1984');
    await searchPage.openFirstResultWithTitle('1984');
    await bookPage.checkAuthorIs('George Orwell');
    await bookPage.checkISBNIs('9789722071550');
    await bookPage.checkPageCountIs('344');
    await bookPage.checkDimensionsAre('156 x 238 x 22 mm');

});

test('Scenario 2 - Search 1984 Book and check A Quinta dos Animais book is authored by the same author.', async ({ page }) => {
    await homePage.searchFor('1984');
    await searchPage.openFirstResultWithTitle('1984');
    await bookPage.checkAuthorIs('George Orwell');
    await bookPage.checkOtherBookBySameAuthorExists('Quinta dos Animais');
});

test('Scenario 3 - Search Do Not Disturb Book and check details', async ({ page }) => {
    await homePage.searchFor('Do Not Disturb');
    await searchPage.openFirstResultWithTitle('Do Not Disturb');
    await bookPage.checkAuthorIs('Freida McFadden');
    await bookPage.checkIdiomIs('Inglês');
    await bookPage.checkLanguageFlagIs('Inglês');
});