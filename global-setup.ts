import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

async function globalSetup() {
  // Create the directory if it doesn't exist
  const storeStatePath = path.join('resources', 'storage-state');
  
  if (!fs.existsSync(storeStatePath)) {
    fs.mkdirSync(storeStatePath, { recursive: true });
    console.log(`Created directory: ${storeStatePath}`);
  }
  
  const storagePath = path.join(storeStatePath, 'storage-state.json');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();


  // Go to site
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
  await context.storageState({ path: storagePath });
  
  // Close everything
  await browser.close();
}

export default globalSetup;