# Bertrand Playwright Tests

QA Automation project built with **Playwright** to test Bertrand Bookstore Website

## Tech Stack

[Playwright](https://playwright.dev/)
[TypeScript](https://www.typescriptlang.org/)
[GitHub Actions](https://github.com/features/actions)

## Project Structure

```
playwright-automation-portfolio/
├── pages/
│   ├── BookPage.ts
│   ├── CartPage.ts
│   └── HomePage.ts
│   └── SearchPage.ts
├── tests/
│   ├── e2e/
│   │   ├── cart.spec.ts
│   │   ├── search.spec.ts
├── utils/
│   ├── cookies.ts
├── .github/workflows/
│   └── playwright.yml
├── playwright.config.ts
```

## Test Coverage

| Area | Tests |
|------|-------|
| Search | Searching Books and checking values |
| Cart | Empty cart, add items, remove items |

**Total: 5 automated tests** running across Chromium

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

```bash
git clone https://github.com/gugamartinho/bertrand_playwright.git
cd bertrand_playwright
npm ci
npx playwright install
```

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# View HTML report
npm run report
```

### Running specific tests

```bash
# Single spec file
npx playwright test tests/e2e/search.spec.ts

# Single test by name
npx playwright test tests/e2e/search.spec.ts -g "Scenario 1 - Search 1984 Book and check details"

### Author
David Martinho