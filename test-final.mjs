import { chromium } from 'playwright';

async function testVideoFix() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture network requests for video
  const videoRequests = [];
  page.on('request', request => {
    if (request.url().includes('.mp4')) {
      videoRequests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers()
      });
    }
  });
  
  page.on('response', response => {
    if (response.url().includes('.mp4')) {
      console.log(`Video response: ${response.status()} ${response.url()}`);
      console.log(`  Cache-Control: ${response.headers()['cache-control']}`);
      console.log(`  Content-Range: ${response.headers()['content-range']}`);
    }
  });

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  
  // Wait for video element to be present
  await page.waitForSelector('video.video-bg', { timeout: 10000 });
  
  // Check video state at various intervals
  const checkVideoState = async (label) => {
    const state = await page.evaluate(() => {
      const video = document.querySelector('video.video-bg');
      if (!video) return { error: 'Video not found' };
      return {
        currentTime: video.currentTime,
        duration: video.duration,
        readyState: video.readyState,
        paused: video.paused,
        ended: video.ended,
        src: video.currentSrc,
        poster: video.poster,
        preload: video.preload
      };
    });
    console.log(`${label}:`, JSON.stringify(state, null, 2));
    return state;
  };
  
  // Check immediately
  await checkVideoState('Initial (0ms)');
  
  // Check after 100ms
  await page.waitForTimeout(100);
  await checkVideoState('After 100ms');
  
  // Check after 500ms
  await page.waitForTimeout(400);
  await checkVideoState('After 500ms');
  
  // Check after 1s
  await page.waitForTimeout(500);
  await checkVideoState('After 1s');
  
  // Check after 2s
  await page.waitForTimeout(1000);
  await checkVideoState('After 2s');
  
  await browser.close();
  
  // Summary
  console.log('\n=== SUMMARY ===');
  console.log('Video requests captured:', videoRequests.length);
  videoRequests.forEach(req => console.log('  ', req.url));
}

testVideoFix().catch(console.error);