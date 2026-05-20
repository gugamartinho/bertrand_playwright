import type { Page } from '@playwright/test';

export async function acceptCookiesIfVisible(page: Page) {
  const acceptButton = page.getByRole('button', { name: 'Aceitar' });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
}