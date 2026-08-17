import { chromium } from 'playwright';

async function testSchema() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/videos', { waitUntil: 'load' });
  
  // Check JSON-LD schema
  const jsonLd = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (const script of scripts) {
      try {
        const data = JSON.parse(script.textContent);
        if (data['@type'] === 'ItemList') {
          return data;
        }
      } catch (e) {}
    }
    return null;
  });
  
  console.log('JSON-LD ItemList found:', !!jsonLd);
  if (jsonLd) {
    console.log('Number of videos:', jsonLd.itemListElement?.length);
    console.log('First video:', JSON.stringify(jsonLd.itemListElement?.[0], null, 2));
  }
  
  await browser.close();
}

testSchema().catch(console.error);