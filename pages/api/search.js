import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const searchUrl = `https://scchs.pastperfectonline.com/Search?search_criteria=${encodeURIComponent(query)}&onlyimages=false`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );

    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // Delay for rendering JS content
    await page.waitForTimeout ? await page.waitForTimeout(3000) : await new Promise(res => setTimeout(res, 3000));

    const results = await page.evaluate(() => {
      const rows = document.querySelectorAll('.PPONRow');
      const data = [];

      rows.forEach(row => {
        const title = row.querySelector('.PPONObjectTitle')?.innerText.trim();
        const image = row.querySelector('img')?.getAttribute('src');
        const type = row.querySelector('.PPONRecordType')?.innerText.trim();
        const link = row.querySelector('a')?.getAttribute('href');

        data.push({
          title,
          image: image ? `https://scchs.pastperfectonline.com${image}` : null,
          type,
          link: link ? `https://scchs.pastperfectonline.com${link}` : null,
        });
      });

      return data;
    });

    await browser.close();
    return res.status(200).json({ results });
  } catch (error) {
    console.error('Scraping error:', error.message);
    return res.status(500).json({ error: 'Scraping failed at Puppeteer level' });
  }
}
