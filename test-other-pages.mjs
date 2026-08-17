import { chromium } from 'playwright';

async function testPage(url, name) {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-cache', '--disable-application-cache', '--disable-offline-load-stale-cache', '--disk-cache-size=0', '--media-cache-size=0']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log(`\n=== Testing ${name} (${url}) ===`);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  
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
  
  console.log('Video element state:');
  console.log(JSON.stringify(videoInfo, null, 2));
  
  // Check for old video references
  const oldRefs = await page.evaluate(() => {
    const html = document.documentElement.outerHTML;
    const matches = [];
    if (html.includes('FAQ Hub Hero')) matches.push('FAQ Hub Hero');
    if (html.includes('Desktop.mp4')) matches.push('Desktop.mp4');
    if (html.includes('Mobile.mp4')) matches.push('Mobile.mp4');
    return matches;
  });
  
  console.log('Old video references:', oldRefs.length > 0 ? oldRefs : 'None found');
  
  await browser.close();
}

async function testAll() {
  await testPage('http://localhost:3000/privacy', 'Privacy Page');
  await testPage('http://localhost:3000/terms', 'Terms Page');
}

testAll().catch(console.error);