import { chromium } from 'playwright';

async function testAllPages() {
  const browser = await chromium.launch({ headless: true });
  const pages = [
    { name: 'Homepage', url: 'http://localhost:3000', selector: 'video.video-bg' },
    { name: 'Videos', url: 'http://localhost:3000/videos', selector: 'video' },
    { name: 'Privacy', url: 'http://localhost:3000/privacy', selector: 'video' },
    { name: 'Terms', url: 'http://localhost:3000/terms', selector: 'video' },
  ];

  for (const pageInfo of pages) {
    const page = await browser.newPage();
    
    console.log(`\n=== Testing ${pageInfo.name} ===`);
    
    page.on('response', response => {
      if (response.url().includes('.mp4')) {
        console.log(`  Video: ${response.status()} ${response.url().split('?')[0]}`);
      }
    });

    try {
      await page.goto(pageInfo.url, { waitUntil: 'load', timeout: 15000 });
      
      // Wait for video element
      await page.waitForSelector(pageInfo.selector, { timeout: 10000 });
      
      // Check video state
      const state = await page.evaluate((selector) => {
        const video = document.querySelector(selector);
        if (!video) return { error: 'Video not found' };
        return {
          currentTime: video.currentTime,
          duration: video.duration,
          readyState: video.readyState,
          paused: video.paused,
          src: video.currentSrc,
          poster: video.poster,
          preload: video.preload
        };
      }, pageInfo.selector);
      
      console.log(`  Initial state:`, JSON.stringify(state, null, 2));
      
      // Wait a bit and check again
      await page.waitForTimeout(500);
      const state2 = await page.evaluate((selector) => {
        const video = document.querySelector(selector);
        if (!video) return { error: 'Video not found' };
        return {
          currentTime: video.currentTime,
          duration: video.duration,
          readyState: video.readyState,
          paused: video.paused,
          src: video.currentSrc
        };
      }, pageInfo.selector);
      
      console.log(`  After 500ms:`, JSON.stringify(state2, null, 2));
      
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
    
    await page.close();
  }
  
  await browser.close();
}

testAllPages().catch(console.error);