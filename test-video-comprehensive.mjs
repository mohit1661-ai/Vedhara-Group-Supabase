import { chromium } from 'playwright';

async function testVideo() {
  const browser = await chromium.launch({ 
    headless: true,
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
        headers: request.headers()
      });
    }
  });
  
  // Track responses
  const responses = [];
  page.on('response', response => {
    if (response.url().includes('.mp4')) {
      responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers()
      });
    }
  });
  
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  
  // Wait a bit for video to load
  await page.waitForTimeout(2000);
  
  // Check video element state
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
      preload: video.preload
    };
  });
  
  console.log('\n=== VIDEO ELEMENT STATE ===');
  console.log(JSON.stringify(videoInfo, null, 2));
  
  console.log('\n=== NETWORK REQUESTS (MP4) ===');
  requests.forEach(r => console.log(`  ${r.method} ${r.url}`));
  
  console.log('\n=== NETWORK RESPONSES (MP4) ===');
  responses.forEach(r => console.log(`  ${r.status} ${r.url}`));
  
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
  
  // Check video element at multiple time points
  console.log('\n=== VIDEO TIME CHECKS ===');
  for (let i = 0; i < 5; i++) {
    await page.waitForTimeout(500);
    const timeInfo = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? { currentTime: video.currentTime, paused: video.paused } : null;
    });
    console.log(`  T+${(i+1)*0.5}s: currentTime=${timeInfo?.currentTime}, paused=${timeInfo?.paused}`);
  }
  
  await browser.close();
}

testVideo().catch(console.error);