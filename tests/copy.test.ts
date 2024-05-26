import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('복사 테스트.', async ({ page }) => {
  await page.getByTestId('code-area').click();

  await expect(page.getByText('복사가 완료되었습니다.')).toBeVisible();

  const text = await page.evaluate(() => {
    /** @fix readText 권한 거절 수정 */
    return navigator.clipboard.readText();
  });

  await expect(text).toEqual(
    expect.stringMatching(/background-(image|repeat|position):\s*[^;]+;|width:\s*[^;]+;|height:\s*[^;]+;/g),
  );
});
