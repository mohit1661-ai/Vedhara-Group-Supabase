import { chromium } from 'playwright';

async function testVideoScreenshot() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-cache', '--disable-application-cache', '--disable-offline-load-stale-cache', '--disk-cache-size=0', '--media-cache-size=0']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Track all network requests
  const requests = [];
  page.on('request', request => {
    if (request.url().includes('.mp4')) {
      requests.push({
        url: request.url(),
        method: request.method(),
        timestamp: Date.now()
      });
      console.log(`[REQUEST] ${request.method()} ${request.url()}`);
    }
  });
  
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  
  // Take screenshot immediately
  await page.screenshot({ path: 'screenshot-0-immediate.png', fullPage: false });
  console.log('Screenshot 0 taken (immediate)');
  
  // Wait and take more screenshots
  for (let i = 1; i <= 10; i++) {
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshot-${i}-${i*0.5}s.png`, fullPage: false });
    console.log(`Screenshot ${i} taken (T+${i*0.5}s)`);
  }
  
  // Check video element state at each point
  console.log('\n=== VIDEO STATE OVER TIME ===');
  for (let i = 0; i <= 10; i++) {
    await page.waitForTimeout(500);
    const videoInfo = await page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return { error: 'No video element found' };
      return {
        currentSrc: video.currentSrc,
        currentTime: video.currentTime,
        readyState: video.readyState,
        networkState: video.networkState,
        paused: video.paused,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight
      };
    });
    console.log(`T+${i*0.5}s:`, JSON.stringify(videoInfo));
  }
  
  await browser.close();
}

testVideoScreenshot().catch(console.error);