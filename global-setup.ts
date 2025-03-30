import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Go to your site
  await page.goto('https://volvogroup.com');
  
  // Handle cookie consent
  try {
    const cookieButton = page.locator('#onetrust-reject-all-handler');
    await cookieButton.waitFor({ state: 'visible', timeout: 5000 });
    await cookieButton.click();
    console.log('Cookie consent handled in setup');
  } catch (e) {
    console.log('Cookie banner not shown or already handled');
  }
  
  // Save storage state to a file
  await context.storageState({ path: './storage-state.json' });
  
  // Close everything
  await browser.close();
}

export default globalSetup;