import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.skip('복사 테스트.', async ({ page }) => {
  await page.getByTestId('code-area').click();

  const text = await page.evaluate(() => {
    /** @fix readText 권한 거절 수정 */
    return navigator.clipboard.readText();
  });

  await expect(text).toEqual(
    expect.stringMatching(/background-(image|repeat|position):\s*[^;]+;|width:\s*[^;]+;|height:\s*[^;]+;/g),
  );
});
