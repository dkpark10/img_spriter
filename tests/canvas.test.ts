import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('탭 전환 드로잉 테스트', async ({ page }) => {
  const canvas = await page.locator('canvas');
  const boundingBox = await canvas.boundingBox();

  if (!boundingBox) throw new Error('empty canvas');

  expect(canvas).toBeVisible();
  await page.mouse.move(boundingBox.x, boundingBox.y);
  await page.mouse.down();

  for (let i = 0; i <= 100; i += 10) {
    await page.mouse.move(boundingBox.x + i, boundingBox.y + i);
  }

  await page.mouse.up();
  await page.screenshot({ path: './tests/canvas.png' });

  expect(await page.getByTestId('code-width').textContent()).toBe('100px');
  expect(await page.getByTestId('code-height').textContent()).toBe('100px');

  // await page.getByRole('tab', { name: /이미지 파일 업로드/i }).click();

  // const fileChooserPromise = page.waitForEvent('filechooser');
  // await page.getByTestId('file_button').click();
  // const fileChooser = await fileChooserPromise;
  // await fileChooser.setFiles('../public/sample2.png');
});
