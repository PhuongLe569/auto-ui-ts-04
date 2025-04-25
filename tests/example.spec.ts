import { test, expect } from '@playwright/test';

test.beforeAll('Before All', () => {
  console.log("Before All");
})

test.beforeEach('Before Each', ()=> {
  console.log("Before Each");
})

test.afterEach('After Each', () => {
  console.log("After Each");
})

test.afterAll('After All', ()=> {
  console.log("After All");
})


test('Test case 1', async ({ page }) => {
  console.log("My test 1")
});

test('Test case 2', async ({ page }) => {
  console.log("My test 2")
});

