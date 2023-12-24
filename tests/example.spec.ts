import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.beforeEach(async ({ page }) => {
  await page.close();
});
