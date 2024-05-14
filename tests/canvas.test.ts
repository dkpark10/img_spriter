import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('탭 전환 후에도 이전 렌더링 정보가 남아야 한다.', async ({ page }) => {
  const boundingBox = await page.locator('canvas').boundingBox();
  if (!boundingBox) throw new Error('empty src canvas');

  await page.mouse.move(boundingBox.x, boundingBox.y);
  await page.mouse.down();

  for (let i = 0; i <= 100; i += 10) {
    await page.mouse.move(boundingBox.x + i, boundingBox.y + i);
  }

  await page.mouse.up();
  await page.screenshot({ path: './tests/canvas-src.png' });

  expect(await page.getByTestId('code-width').textContent()).toBe('100px');
  expect(await page.getByTestId('code-height').textContent()).toBe('100px');

  await page.getByRole('tab', { name: /이미지 파일 업로드/i }).click();

  await page.getByTestId('file_button').click();
  await page.locator('input[type=file]').setInputFiles('./tests/sample2.png');

  await page.screenshot({ path: './tests/canvas-file.png' });

  const boundingBox2 = await page.locator('canvas').boundingBox();
  if (!boundingBox2) throw new Error('empty file canvas');

  await page.mouse.move(boundingBox2.x, boundingBox2.y);
  await page.mouse.down();

  /** @fix 60까지 밖에 드래그가 안됨 */
  for (let i = 0; i <= 60; i += 10) {
    await page.mouse.move(boundingBox2.x + i, boundingBox2.y + i);
  }
  
  await page.mouse.up();  
  expect(await page.getByTestId('code-width').textContent()).toBe('60px');
  expect(await page.getByTestId('code-height').textContent()).toBe('60px');

  await page.getByRole('tab', { name: /이미지 경로 검색/i }).click();
  expect(await page.getByTestId('code-width').textContent()).toBe('100px');
  expect(await page.getByTestId('code-height').textContent()).toBe('100px');
});
