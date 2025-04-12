import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Handles Volvo authentication and saves the storage state
 * @returns Path to the storage state file
 */
export async function setupVolvoAuth(): Promise<string> {
  console.log('Setting up Volvo authentication');
  
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

  try {
    // Go to site with extended timeout 
    await page.goto('https://volvogroup.com', { 
      timeout: 60000,
      waitUntil: 'domcontentloaded'
    });
    
    // Handle cookie consent
    try {
      const cookieButton = page.locator('#onetrust-reject-all-handler');
      if (await cookieButton.isVisible({ timeout: 5000 })) {
        await cookieButton.click();
        console.log('Clicked reject cookies button');
      }
    } catch (e) {
      console.log('Cookie dialog not found or already handled');
    }

    // Save storage state to file
    await context.storageState({ path: storagePath });
    console.log(`Storage state saved to ${storagePath}`);
    
    return storagePath;
  } finally {
    // Always close browser
    await browser.close();
  }
}