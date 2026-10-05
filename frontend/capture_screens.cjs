const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../video_frames');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const routes = [
  { name: '01_landing', url: 'http://localhost:5173/', wait: 2500 },
  { name: '02_create_site', url: 'http://localhost:5173/app/create', wait: 2000 },
  { name: '03_climate', url: 'http://localhost:5173/app/climate', wait: 2000 },
  { name: '04_materials', url: 'http://localhost:5173/app/materials', wait: 2000 },
  { name: '05_3d_twin', url: 'http://localhost:5173/app/design/studio', wait: 3000 },
  { name: '06_simulation', url: 'http://localhost:5173/app/simulation', wait: 2000 },
  { name: '07_heatmap', url: 'http://localhost:5173/app/heatmap', wait: 2000 },
  { name: '08_what_if', url: 'http://localhost:5173/app/what-if', wait: 2000 },
  { name: '09_compare', url: 'http://localhost:5173/app/compare', wait: 2000 },
  { name: '10_result', url: 'http://localhost:5173/app/result', wait: 2500 }
];

(async () => {
  console.log('Launching Edge for live screen capture...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  for (const r of routes) {
    console.log(`Navigating to ${r.name} (${r.url})...`);
    await page.goto(r.url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(res => setTimeout(res, r.wait));
    const dest = path.join(outDir, `${r.name}.png`);
    await page.screenshot({ path: dest });
    console.log(`Saved: ${dest}`);
  }

  // Open "Find Suppliers" modal on result page
  console.log('Opening Find Suppliers modal on Result page...');
  try {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Find Suppliers')) {
        await btn.click();
        await new Promise(res => setTimeout(res, 1200));
        const modalDest = path.join(outDir, '11_suppliers_modal.png');
        await page.screenshot({ path: modalDest });
        console.log(`Saved: ${modalDest}`);
        break;
      }
    }
  } catch (err) {
    console.log('Supplier modal note:', err.message);
  }

  await browser.close();
  console.log('All screen captures successfully saved!');
})();
