import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.beforeEach(async ({ page }) => {
  await page.close();
});

test.describe('서비스 모든 테스트', () => {
  test('탭 전환시 이전 드래그 했던 정보들을 렌더링 한다.', async ({ page }) => {
  });
});
