import { chromium } from 'playwright';

async function checkInitialHtml() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Get initial HTML before any JS runs
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  
  const html = await page.content();
  
  // Search for video references in initial HTML
  const matches = html.match(/videos\/[^"']*\.mp4[^"']*/g);
  if (matches) {
    console.log('Video URLs in initial HTML:');
    matches.forEach(m => console.log('  ', m));
  } else {
    console.log('No video URLs found in initial HTML');
  }
  
  // Also check for the old video names
  const oldMatches = html.match(/(Homepage.*Hero.*Desktop|Homepage.*Hero.*Mobile|FAQ.*Hub.*Hero)/gi);
  if (oldMatches) {
    console.log('Old video references found:', oldMatches);
  }
  
  await browser.close();
}

checkInitialHtml().catch(console.error);