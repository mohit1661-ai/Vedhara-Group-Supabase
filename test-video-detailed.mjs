import { chromium } from 'playwright';

async function testVideoDetailed() {
  const browser = await chromium.launch({ 
    headless: false, // Run visible to see what's happening
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
        headers: request.headers(),
        timestamp: Date.now()
      });
      console.log(`[REQUEST] ${request.method()} ${request.url()}`);
    }
  });
  
  // Track responses
  const responses = [];
  page.on('response', response => {
    if (response.url().includes('.mp4')) {
      responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers(),
        timestamp: Date.now()
      });
      console.log(`[RESPONSE] ${response.status()} ${response.url()}`);
    }
  });
  
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  
  // Check video element state immediately
  const videoInfo = await page.evaluate(() => {
    const video = document.querySelector('video');
    if (!video) return { error: 'No video element found' };
    return {
      src: video.src,
      currentSrc: video.currentSrc,
      currentTime: video.currentTime,
      duration: video.duration,
      readyState: video.readyState,
      networkState: video.networkState,
      paused: video.paused,
      ended: video.ended,
      poster: video.poster,
      preload: video.preload,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight
    };
  });
  
  console.log('\n=== VIDEO ELEMENT STATE (immediate) ===');
  console.log(JSON.stringify(videoInfo, null, 2));
  
  // Check at multiple time points
  console.log('\n=== VIDEO TIME CHECKS ===');
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(200);
    const timeInfo = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? { currentTime: video.currentTime, paused: video.paused, readyState: video.readyState } : null;
    });
    console.log(`  T+${(i+1)*0.2}s: currentTime=${timeInfo?.currentTime}, paused=${timeInfo?.paused}, readyState=${timeInfo?.readyState}`);
  }
  
  // Check for any old video references in the DOM
  const oldVideoRefs = await page.evaluate(() => {
    const html = document.documentElement.outerHTML;
    const matches = [];
    if (html.includes('FAQ Hub Hero')) matches.push('FAQ Hub Hero');
    if (html.includes('Desktop.mp4')) matches.push('Desktop.mp4');
    if (html.includes('Mobile.mp4')) matches.push('Mobile.mp4');
    return matches;
  });
  
  console.log('\n=== OLD VIDEO REFERENCES IN DOM ===');
  console.log(oldVideoRefs.length > 0 ? oldVideoRefs : 'None found');
  
  // Check the actual video file being served
  const videoUrl = await page.evaluate(() => {
    const video = document.querySelector('video');
    return video ? video.currentSrc : null;
  });
  
  console.log('\n=== VIDEO URL BEING SERVED ===');
  console.log(videoUrl);
  
  // Check if there's a service worker
  const sw = await page.evaluate(() => {
    return navigator.serviceWorker.controller ? 'Service Worker active' : 'No Service Worker';
  });
  console.log('\n=== SERVICE WORKER ===');
  console.log(sw);
  
  await browser.close();
}

testVideoDetailed().catch(console.error);