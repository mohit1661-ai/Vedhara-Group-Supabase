import { chromium } from 'playwright';

async function checkHtml() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  
  const html = await page.content();
  
  // Search for ALL video references in initial HTML
  const allMatches = html.match(/Homepage.*Hero.*Video/gi);
  if (allMatches) {
    console.log('All Homepage Hero Video references:');
    [...new Set(allMatches)].forEach(m => console.log('  ', m));
  } else {
    console.log('No Homepage Hero Video references found');
  }
  
  // Search for FAQ Hub
  const faqMatches = html.match(/FAQ.*Hub.*Hero/gi);
  if (faqMatches) {
    console.log('FAQ Hub references:', [...new Set(faqMatches)]);
  } else {
    console.log('No FAQ Hub references found');
  }
  
  // Search for Desktop/Mobile
  const dmMatches = html.match(/(Desktop|Mobile)\.mp4/gi);
  if (dmMatches) {
    console.log('Desktop/Mobile references:', [...new Set(dmMatches)]);
  } else {
    console.log('No Desktop/Mobile references found');
  }
  
  // Search for Real Estate Advisory
  const reaMatches = html.match(/Real.*Estate.*Advisory/gi);
  if (reaMatches) {
    console.log('Real Estate Advisory references:', [...new Set(reaMatches)]);
  } else {
    console.log('No Real Estate Advisory references found');
  }
  
  // Search for videoSrc in HTML
  const videoSrcMatches = html.match(/videoSrc[^"]*"/gi);
  if (videoSrcMatches) {
    console.log('videoSrc references:', [...new Set(videoSrcMatches)].slice(0, 5));
  }
  
  // Search for the actual video URL in the HTML
  const videoUrlMatches = html.match(/\/videos\/[^"']*\.mp4[^"']*/gi);
  if (videoUrlMatches) {
    console.log('Video URL references:', [...new Set(videoUrlMatches)]);
  }
  
  await browser.close();
}

checkHtml().catch(console.error);