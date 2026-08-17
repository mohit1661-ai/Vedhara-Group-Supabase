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
  
  console.log('\n=== WATCH PAGE VIDEO ELEMENT STATE ===');
  console.log(JSON.stringify(videoInfo, null, 2));
  
  // Check JSON-LD schema for VideoObject
  const schema = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const videoObjects = [];
    scripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent);
        if (data['@type'] === 'VideoObject' || (Array.isArray(data) && data.some(d => d['@type'] === 'VideoObject'))) {
          videoObjects.push(data);
        }
      } catch (e) {}
    });
    return videoObjects;
  });
  
  console.log('\n=== VIDEO OBJECT SCHEMA ===');
  console.log(JSON.stringify(schema, null, 2));
  
  // Check all video items in the list
  const videoItems = await page.evaluate(() => {
    const items = document.querySelectorAll('[data-video-item]');
    const videos = [];
    items.forEach(item => {
      const title = item.querySelector('h3, h4, .video-title')?.textContent?.trim();
      const video = item.querySelector('video');
      videos.push({
        title,
        videoSrc: video?.src,
        poster: video?.poster
      });
    });
    return videos;
  });
  
  console.log('\n=== VIDEO LIST ITEMS ===');
  console.log(JSON.stringify(videoItems, null, 2));
  
  await browser.close();
}

testWatchPage().catch(console.error);