import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3099;
const distDir = path.resolve(process.cwd(), 'dist');
const vercelConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'vercel.json'), 'utf8'));

// 1. Redirects from vercel.json
for (const r of vercelConfig.redirects) {
  if (r.has && r.has[0]?.value === 'www.adaah.life') {
    // apex redirect
    continue;
  }
  const cleanSource = r.source.replace(':slug*', '*');
  app.get(r.source, (req, res) => {
    let dest = r.destination;
    if (req.params.slug) {
      dest = dest.replace(':slug*', req.params.slug);
    }
    return res.redirect(r.permanent ? 308 : 307, dest);
  });
}

// 2. Static cleanUrl resolution
app.use((req, res, next) => {
  const reqPath = req.path;
  
  // File exists?
  const directPath = path.join(distDir, reqPath);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return res.sendFile(directPath);
  }

  // Directory with index.html?
  const dirIndexPath = path.join(distDir, reqPath, 'index.html');
  if (fs.existsSync(dirIndexPath)) {
    return res.sendFile(dirIndexPath);
  }

  // Clean .html file?
  const htmlPath = path.join(distDir, `${reqPath}.html`);
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }

  // Not found -> 404.html
  const notFoundPath = path.join(distDir, '404.html');
  if (fs.existsSync(notFoundPath)) {
    return res.status(404).sendFile(notFoundPath);
  }

  return res.status(404).send('Not Found');
});

const server = app.listen(port, async () => {
  console.log(`Test server running on port ${port}`);

  const testUrls = [
    // 200 OK tests
    { path: '/', expected: 200 },
    { path: '/profiles', expected: 200 },
    { path: '/profiles/ananya-banjara-hills', expected: 200 },
    { path: '/locations/banjara-hills', expected: 200 },
    { path: '/locations/nanakramguda', expected: 200, checkNoindex: true },
    { path: '/locations/attapur', expected: 200, checkNoindex: true },
    { path: '/services/dinner-companion', expected: 200 },
    { path: '/guides/first-time-client-etiquette', expected: 200 },
    { path: '/faq', expected: 200 },
    { path: '/safety', expected: 200 },
    
    // 301/308 Redirect tests
    { path: '/profiles/ananya', expected: 308, expectedLocation: '/profiles/ananya-banjara-hills' },
    { path: '/profiles/priya', expected: 308, expectedLocation: '/profiles/priya-banjara-hills' },
    { path: '/services/dinner-date-accompaniment', expected: 308, expectedLocation: '/services/dinner-companion' },
    { path: '/services/hotel-suite-outcall', expected: 308, expectedLocation: '/services/companionship' },
    { path: '/guides/hotel-suite-outcall-safety-guide', expected: 308, expectedLocation: '/guides/hotel-suite-appointments-hyderabad' },
    { path: '/guides/discretion-privacy-protocols', expected: 308, expectedLocation: '/safety' },
    { path: '/blog', expected: 308, expectedLocation: '/guides' },

    // 404 Not Found tests
    { path: '/profiles/aaradhya', expected: 404, checkNoCanonical: true },
    { path: '/profiles/diya', expected: 404, checkNoCanonical: true },
    { path: '/profiles/ria', expected: 404, checkNoCanonical: true },
    { path: '/services/overnight-companionship', expected: 404, checkNoCanonical: true },
    { path: '/guides/identifying-verified-profiles', expected: 404, checkNoCanonical: true },
    { path: '/random-unknown-page-xyz', expected: 404, checkNoCanonical: true },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of testUrls) {
    try {
      const res = await fetch(`http://localhost:${port}${t.path}`, { redirect: 'manual' });
      const status = res.status;
      const location = res.headers.get('location');

      let statusOk = status === t.expected;
      let locationOk = !t.expectedLocation || location === t.expectedLocation;

      let noindexOk = true;
      let noCanonicalOk = true;
      if (t.checkNoindex || (t as any).checkNoCanonical) {
        const body = await res.text();
        if (t.checkNoindex) {
          noindexOk = body.includes('name="robots" content="noindex, follow"');
        }
        if ((t as any).checkNoCanonical) {
          noCanonicalOk = !body.includes('rel="canonical"') && !body.includes('og:url');
        }
      }

      if (statusOk && locationOk && noindexOk && noCanonicalOk) {
        console.log(`✓ [PASS] ${t.path} -> ${status}${location ? ` (-> ${location})` : ''}`);
        passed++;
      } else {
        console.error(`✗ [FAIL] ${t.path} -> got ${status} (expected ${t.expected}), location: ${location}, noindexOk: ${noindexOk}, noCanonicalOk: ${noCanonicalOk}`);
        failed++;
      }
    } catch (err) {
      console.error(`✗ [ERROR] ${t.path}:`, err);
      failed++;
    }
  }

  console.log(`\nTest results: ${passed} passed, ${failed} failed out of ${testUrls.length} total tests.`);
  server.close();
  process.exit(failed > 0 ? 1 : 0);
});

