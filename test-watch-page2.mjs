import { chromium } from 'playwright';

async function testWatchPage() {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-cache', '--disable-application-cache', '--disable-offline-load-stale-cache', '--disk-cache-size=0', '--media-cache-size=0']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Navigating to watch page...');
  await page.goto('http://localhost:3000/videos', { waitUntil: 'load' });
  
  // Wait a bit for video to load
  await page.waitForTimeout(2000);
  
  // Check all JSON-LD schemas
  const schemas = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const allSchemas = [];
    scripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent);
        allSchemas.push(data);
      } catch (e) {}
    });
    return allSchemas;
  });
  
  console.log('\n=== ALL JSON-LD SCHEMAS ===');
  schemas.forEach((schema, i) => {
    console.log(`\n--- Schema ${i} ---`);
    console.log(JSON.stringify(schema, null, 2).substring(0, 2000));
  });
  
  // Check video items in the list
  const videoItems = await page.evaluate(() => {
    const items = document.querySelectorAll('a[href*="/videos/"]');
    const videos = [];
    items.forEach(item => {
      const title = item.querySelector('h3, h4, .video-title, [class*="title"]')?.textContent?.trim();
      const video = item.querySelector('video');
      const img = item.querySelector('img');
      videos.push({
        title,
        href: item.href,
        videoSrc: video?.src,
        poster: video?.poster || img?.src
      });
    });
    return videos;
  });
  
  console.log('\n=== VIDEO LIST ITEMS ===');
  console.log(JSON.stringify(videoItems, null, 2));
  
  // Check for the Real Estate Advisory video in the list
  const realEstateVideo = await page.evaluate(() => {
    const allText = document.body.innerText;
    return allText.includes('Real Estate Advisory') || allText.includes('Real Estate Advisory in Gurgaon');
  });
  
  console.log('\n=== REAL ESTATE ADVISORY VIDEO IN LIST ===');
  console.log(realEstateVideo ? 'Found' : 'Not found');
  
  await browser.close();
}

testWatchPage().catch(console.error);