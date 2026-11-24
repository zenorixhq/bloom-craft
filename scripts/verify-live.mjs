async function checkUrl(url) {
  try {
    const r = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
    const t = await r.text();
    console.log(`\n--- Checking: ${url} ---`);
    console.log('Status:', r.status);
    console.log('Contains font-logo class:', t.includes('font-logo'));
    console.log('Contains font-primary class or body:', t.includes('font-primary'));
    console.log('Contains Contact Us in nav:', t.includes('Contact Us'));

    // Extract css links
    const cssHrefs = [...t.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(m => m[1]);
    console.log('Found CSS files:', cssHrefs.length);
    for (const href of cssHrefs) {
      const fullUrl = href.startsWith('http') ? href : new URL(href, url).href;
      const cssRes = await fetch(fullUrl);
      const cssText = await cssRes.text();
      const hasCinzel = cssText.includes('Cinzel Decorative') || cssText.includes('Cinzel+Decorative');
      const hasPrimaryVar = cssText.includes('--font-primary');
      console.log(`  CSS ${href.slice(0, 35)}... -> Cinzel Decorative: ${hasCinzel}, --font-primary: ${hasPrimaryVar}`);
    }
  } catch (e) {
    console.error(`Error checking ${url}:`, e.message);
  }
}

async function test() {
  await checkUrl('https://bloom-craft-867m.vercel.app');
  await checkUrl('https://www.bloomcraft.co.in');
}
test().catch(console.error);
