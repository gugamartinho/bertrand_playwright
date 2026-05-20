import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { BookPage } from "../pages/BookPage";
import { BookDetails } from "../pages/BookDetails";

let homePage: HomePage;
let bookPage: BookPage;
let bookDetails: BookDetails;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
    bookPage = new BookPage(page);
    bookDetails = new BookDetails(page);
    await homePage.acceptCookiesIfVisible();  // Ensure cookies are accepted before each test
});

test('Scenario 1 - Search "1984" Book and check details', async ({ page }) => {
    await homePage.searchFor('1984');
    await bookPage.openFirstResultWithTitle('1984');
    await bookDetails.checkAuthorIs('George Orwell');
    await bookDetails.checkISBNIs('9789722071550');
    await bookDetails.checkPageCountIs('344');
    await bookDetails.checkDimensionsAre('156 x 238 x 22 mm');

});

test('Scenario 2 - Search "1984" Book and check "A Quinta dos Animais" book is authored by the same author.', async ({ page }) => {
    await homePage.searchFor('1984');
    await bookPage.openFirstResultWithTitle('1984');
    await bookDetails.checkAuthorIs('George Orwell');
    await bookDetails.checkOtherBookBySameAuthorExists('Quinta dos Animais');
});

test('Scenario 3 - Search "Do Not Disturb" Book and check details', async ({ page }) => {
    await homePage.searchFor('Do Not Disturb');
    await bookPage.openFirstResultWithTitle('Do Not Disturb');
    await bookDetails.checkAuthorIs('Freida McFadden');
    await bookDetails.checkIdiomIs('Inglês');
    await bookDetails.checkLanguageFlagIs('Inglês');
});