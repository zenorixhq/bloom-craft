async function test() {
  const r = await fetch('https://www.bloomcraft.co.in');
  const t = await r.text();
  console.log('Status:', r.status);
  console.log('Contains Contact Us in nav:', t.includes('Contact Us'));
  console.log('Contains Collection in nav:', t.includes('Collection'));
  console.log('Contains /contact link:', t.includes('/contact'));
  console.log('Contains Shop All Collections:', t.includes('Shop All Collections'));
}
test().catch(console.error);
