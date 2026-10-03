const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });
  const errors = [];

  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push('console: ' + msg.text());
  });

  const start = Date.now();
  await page.goto('http://localhost:8000/', { waitUntil: 'networkidle', timeout: 30000 });
  const loadMs = Date.now() - start;
  await page.waitForSelector('#profile-name', { timeout: 15000 });

  const profileName = await page.locator('#profile-name').innerText();
  const projectCount = await page.locator('.project-card').count();
  const serviceCount = await page.locator('.service-card').count();
  const filters = await page.locator('.filter-chip').count();
  const badge = await page.locator('#orders-badge').innerText();

  const fetchStatus = await page.evaluate(async () => {
    const files = ['profile.json', 'projects.json', 'services.json'];
    const results = {};
    for (const file of files) {
      const res = await fetch('./data/' + file);
      results[file] = { status: res.status, ok: res.ok };
    }
    return results;
  });

  console.log(JSON.stringify({
    title: await page.title(),
    profileName,
    projectCount,
    serviceCount,
    filters,
    badge,
    fetchStatus,
    loadMs,
    errors
  }, null, 2));

  await browser.close();
})();
